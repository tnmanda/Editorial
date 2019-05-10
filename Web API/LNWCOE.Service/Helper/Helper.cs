using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using LNWCOE.Models.HR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace LNWCOE.Service.Helpers
{
    public enum HRRequestMode
    {
        Create,
        Update,
        SetInactive,
        Close
    }

    public static class EditorialModules
    {
        public const string BWQ = "BWQ";
        public const string Alerts = "Alerts";
        public const string Investigations = "Investigations";
        public const string News = "News Queue";
        public const string Admin = "Admin";
    }

    public static class Helper
    {
        // Returns "Get<ControllerName>"
        public static string GetRouteString(ControllerContext cntx)
        {
            string RouteString = "Get" + cntx.RouteData.Values["controller"].ToString();
            return RouteString;
        }

        // evaluates an object and returns IActionResult if the object has contents or null
        public static IActionResult CheckResult(object data, bool deleted = false, bool updatefailed = false)
        {
            try
            {
                if (data != null && deleted)
                {
                    return Ok("Record Deleted");
                }

                if (data == null && updatefailed)
                {
                    return Ok("Update Failed");
                }

                if (data != null && deleted == false)
                {
                    return Ok(data);
                }
                else if (data == null)
                {
                    return NotFound();
                }
                else
                {
                    return (NotOk());
                }
            }
            catch
            {
                return (NotOk());
            }
           
        }
      
        private static IActionResult Ok(object data)
        {
            OkObjectResult okResult = new OkObjectResult(data);
            return okResult;
        }
        private static IActionResult NotOk()
        {
            BadRequestResult badResult = new BadRequestResult();
            return badResult;
        }
        private static IActionResult NotFound()
        {
            NotFoundResult notFoundResult = new NotFoundResult();
            return notFoundResult;
        }

        public static HttpClient InitializeHttpClient(HttpClient client, string token, bool addBearer = false)
        {
            if(client != null)
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                client.DefaultRequestHeaders.TryAddWithoutValidation("X-HumanReviewApi-Version", "1.0");
                if (addBearer)
                {
                    if (token != "")
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                    }
                    else
                    {
                        return null;
                    }
                }
                return client;
            }
            return null;
        }

        // Return the HTTP Response given a url used to test if an external service is up
        // 400 - Bad Request, should be ok it means service is up but the data is malformed 
        // 404 Not Found this indicates that the service is unavailable
        public static ApiWebResponse GetHRServerStatus(IConfiguration configuration)

        {
            var hruri = configuration.GetSection("HumanReview:uri").Value + "auth/token";

            ApiWebResponse ApiResp = new ApiWebResponse();

            WebClient client = new WebClient();
            string result = "";

            try
            {
                result = client.DownloadString(hruri);
                ApiResp.Message = "OK";

            }
            catch (WebException e)
            {
                ApiResp.Message = e.Message;
                if (e.Response is HttpWebResponse response)
                {
                    ApiResp.StatusCode = (int)response.StatusCode;
                    ApiResp.Response = e.Response;
                }
                else
                {
                    ApiResp.StatusCode = 0;
                    ApiResp.Response = null;
                }
            }
            return ApiResp;
        }

        
        /// <summary>
        /// Creates WorkItem entry in Human Review API
        /// Used when Creating / Requesting new Human Review WorkItems
        /// Returns the structure containing Human Review Information of a created WorkItem
        /// </summary>
        /// <param name="wkitem"></param>
        /// <param name="token"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static WorkItemData GetHRWorkItem(WorkItemRequest wkitem, string token, IConfiguration configuration)
        {
            string hruri = configuration.GetSection("HumanReview:uri").Value + "workItems/";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;
            HttpClient client;

            WorkItemData wrkData;

            using (client = new HttpClient())
            {
                var ReadyClient = InitializeHttpClient(client, token, true);
                //ReadyClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var jsonText = JsonConvert.SerializeObject(wkitem);
                var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");
                ;
                response = ReadyClient.PostAsync(uri, jsonContent).Result; // Post Call To create a Human Review WorkItem
                response.EnsureSuccessStatusCode();
                var dataString = response.Content.ReadAsStringAsync().Result;

                wrkData = JsonConvert.DeserializeObject<WorkItemData>(dataString);

                ReadyClient.Dispose();
            }
            return (wrkData);
        }

        /// <summary>
        /// Called when an existing WorkItem is updated
        /// 
        /// </summary>
        /// <param name="wkitem"></param>
        /// <param name="token"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static WorkItemData PutHRWorkItem(WorkItemPutRequest wkitem, string token, IConfiguration configuration)
        {
            string hruri = configuration.GetSection("HumanReview:uri").Value + "workItems/";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;
            HttpClient client;

            WorkItemData wrkData;
            using (client = new HttpClient())
            {
                var ReadyClient = InitializeHttpClient(client, token, true);
                //ReadyClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var jsonText = JsonConvert.SerializeObject(wkitem);
                var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");
                ;
                response = client.PutAsync(uri, jsonContent).Result;
                response.EnsureSuccessStatusCode();
                var dataString = response.Content.ReadAsStringAsync().Result;

                wrkData = JsonConvert.DeserializeObject<WorkItemData>(dataString);

                ReadyClient.Dispose();
            }
            return (wrkData);
        }

        public static bool TokenValid(JwtSecurityToken token)
        {
            // Other checks to be added here (claims etc)
            // For now it only checks for expiration

            var expiry = token.ValidTo;
            if (expiry < DateTime.UtcNow.AddMinutes(1))
            {
                return false;
            }

            return true;
        }

        /// <summary>
        ///
        /// This function returns a request structure to be sent to the Human Review for Creating and Updating WorkItems
        /// </summary>
        /// <param name="modulename"></param>
        /// <param name="QueueGuidString"></param>
        /// <param name="JsonData"></param>
        /// <param name="configuration"></param>
        /// <param name="workitemGuid"></param>
        /// <param name="hrRequestMode"></param>
        /// <returns></returns>
        public static object BuildHRWorkItemRequest(string modulename, string QueueGuidString, string JsonData,
            IConfiguration configuration, string workitemGuid, HRRequestMode hrRequestMode)
        {
            string HRCreateRequestName = "";
            string HRCreateRequestDescription = "";
            string HRStatusDetailTypeGuid = "";
            string HRReviewTypeGuid = "";
            bool HREntryActive = true;
            Guid QueueGuid = Guid.Parse(QueueGuidString);

            if (hrRequestMode == HRRequestMode.Create)
            {
                HRCreateRequestName = "Created Human Review WorkItem Entry for " + modulename + " Record";
                HRCreateRequestDescription = "Created Human Review WorkItem Entry for " + modulename + " Record";
                HRStatusDetailTypeGuid = configuration.GetSection("HumanReview:statusDetailTypeGuid_ins").Value;
                HRReviewTypeGuid = configuration.GetSection("HumanReview:reviewTypeGuid_ins").Value;

                WorkItemRequest HRCreateRequest = new WorkItemRequest
                {
                    Name = HRCreateRequestName,
                    Description = HRCreateRequestDescription,
                    QueueGuid = QueueGuid,
                    StatusDetailTypeGuid = HRStatusDetailTypeGuid,
                    ReviewTypeGuid = HRReviewTypeGuid,
                    FormDefinitionJson = JsonData,
                    IsActive = HREntryActive
                };

                return HRCreateRequest;

            }

            if (hrRequestMode == HRRequestMode.Update)
            {
                HRCreateRequestName = "Updated Human Review WorkItem Entry for " + modulename + " Record";
                HRCreateRequestDescription = "Updated Human Review WorkItem Entry for " + modulename + " Record";
                HRStatusDetailTypeGuid = configuration.GetSection("HumanReview:statusDetailTypeGuid_upd").Value;
                HRReviewTypeGuid = configuration.GetSection("HumanReview:reviewTypeGuid_upd").Value;

                WorkItemPutRequest HRCreateRequest = new WorkItemPutRequest
                {
                    Name = HRCreateRequestName,
                    Description = HRCreateRequestDescription,
                    QueueGuid = QueueGuid,
                    StatusDetailTypeGuid = HRStatusDetailTypeGuid,
                    ReviewTypeGuid = HRReviewTypeGuid,
                    FormDefinitionJson = JsonData,
                    IsActive = HREntryActive,
                    WorkitemGuid = workitemGuid  // Needed for Update calls
                };

                return HRCreateRequest;
            }

            return null;
        }


        public static bool ValidEmail(string email)
        {
            string pattern = @"^(([^<>()[\]\\.,;:\s@\""]+"
                + @"(\.[^<>()[\]\\.,;:\s@\""]+)*)|(\"".+\""))@"
                + @"((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}"
                + @"\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+"
                + @"[a-zA-Z]{2,}))$";

            Regex regStrict = new Regex(pattern);

            if (!String.IsNullOrEmpty(email) && regStrict.IsMatch(email))
                return true;
            else
                return false;

        }

        public static void SendMail(string SmtpServer, string From, string To, string CC, string BCC, string Subject,
            string Body)
        {
            SmtpClient client = new SmtpClient(SmtpServer)
            {
                UseDefaultCredentials = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                DeliveryFormat = SmtpDeliveryFormat.SevenBit
            };

            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress(From)
            };
            mailMessage.To.Add(To);
            mailMessage.CC.Add(CC);
            mailMessage.Bcc.Add(BCC);
            mailMessage.Subject = Subject;
            mailMessage.Body = Body;

            client.Send(mailMessage);
            client.Dispose();
            
        }
    }
}
