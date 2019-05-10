using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using LNWCOE.Models.HRData;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace LNWCOE.Helpers
{

    public static class ErrorCodes
    {
        // Foreign Key Conflict Error
        public const int FK_Conflict = 10001;

        // No Permission
        public const int No_Permission = 10002;

        // Already Exists
        public const int Record_Exists = 10003;

        // General Error, undefined
        public const int Undefined = 10020;
     
    }

    public class ReturnData
    {
        public int Code { get; set; }
        public Guid guid { get; set; }
        public string Message { get; set; }
    }

    public class ApiWebResponse
    {
        public WebResponse Response { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }

    public static class Common
    {
        /*
        public static string CamelCaseJson(object obj)
        {
            //var Content = (new { Investigation = invData, Reason = reasonData, Entity = thisEntity }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });


            //return Content;
            Json(obj,
                new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }
                );
        }
        */
        public static ApiWebResponse ServerStatusBy(string url)

        {
            ApiWebResponse ApiResp = new ApiWebResponse();

            WebClient client = new WebClient();
            string result = "";

            try
            {
                result = client.DownloadString(url);
                ApiResp.Message = "OK";

            }
            catch (WebException e)
            // Bad Request here means the request is invalid but the service is up
            // Not Found is what we are looking for
            {
                ApiResp.Message = e.Message;
                var response = e.Response as HttpWebResponse;
                if (response != null)
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

        public static bool IsValidEmail(string email)
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

        public static string SendMail(string SmtpServer, string From, string To, string CC, string BCC, string Subject,
            string Body, ILogger logger)
        {
            SmtpClient client = new SmtpClient(SmtpServer);

            client.UseDefaultCredentials = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.DeliveryFormat = SmtpDeliveryFormat.SevenBit;

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(From);
            mailMessage.To.Add(To);
            //mailMessage.CC.Add(CC);
            //mailMessage.Bcc.Add(BCC);
            mailMessage.Subject = Subject;
            mailMessage.Body = Body;


            try
            {
                client.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Guid newguid = Guid.NewGuid(); ;

                logger.LogError(newguid + " - " + ex.ToString());

                var Error = string.Format("Error: Email not sent reference {0}", newguid);
                return Error;
            }

            return "Success";
        }

        // HR Routines
        public static WorkItemData putWorkItemForEntityAsync(WorkItemPutRequest wkitem, string token, IConfiguration configuration)
        {
            string hruri = configuration.GetSection("HumanReview:uri").Value + "workItems/";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;
            HttpClient client;

            WorkItemData wrkData;
            using (client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();

                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                client.DefaultRequestHeaders.TryAddWithoutValidation("X-HumanReviewApi-Version", "1.0");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var jsonText = JsonConvert.SerializeObject(wkitem);
                var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");
                ;
                response = client.PutAsync(uri, jsonContent).Result;
                response.EnsureSuccessStatusCode();
                var dataString = response.Content.ReadAsStringAsync().Result;

                wrkData = JsonConvert.DeserializeObject<WorkItemData>(dataString);

            }
            return (wrkData);
        }

        public static WorkItemData getWorkItemAsync(WorkItemRequest wkitem, string token, IConfiguration configuration)
        {
            string hruri = configuration.GetSection("HumanReview:uri").Value + "workItems/";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;
            HttpClient client;

            WorkItemData wrkData;

            using (client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();

                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                client.DefaultRequestHeaders.TryAddWithoutValidation("X-HumanReviewApi-Version", "1.0");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var jsonText = JsonConvert.SerializeObject(wkitem);
                var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");
                ;
                response = client.PostAsync(uri, jsonContent).Result;
                response.EnsureSuccessStatusCode();
                var dataString = response.Content.ReadAsStringAsync().Result;

                wrkData = JsonConvert.DeserializeObject<WorkItemData>(dataString);

            }
            return (wrkData);
        }

        public class SSOData
        {
            public string Token { get; set; }
            public string Url { get; set; }
            public string Email { get; set; }
        }
    }
}
