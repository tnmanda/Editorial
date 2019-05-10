using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using LNWCOE.Models.Context;
using LNWCOE.Models.HR;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using LNWCOE.Service.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class InvestigationRepository : Repository<Investigation>, IInvestigationRepository
    {
        private new readonly EditorialDataContext _context;
        private readonly MMMDataContext _mmmcontext;

        public InvestigationRepository(EditorialDataContext context, MMMDataContext mmmcontext) : base(context)
        {
            _context = context;
            _mmmcontext = mmmcontext;
        }

        public IEnumerable<Investigation> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("PriorityType", "Country", "FunctionType", "InvestigationDispositions", "InvestigationStatus");
            return data;
        }

        public Investigation GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("PriorityType", "Country", "FunctionType", "InvestigationDispositions", "InvestigationStatus")
                .Where(x => x.InvestigationID == id)
                .FirstOrDefault();
            return query;
        }

        /// <summary>
        /// Left Navigation data for the Investigations page
        /// This function returns the Items to be used in the collapsing menu on the left pane used for navigation
        /// </summary>
        /// <param name="appUserId"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public object GetNavigationsWithCounts(int appUserId)
        {
            // All Investigation records
            IQueryable<InvNavDataWithUser> barnavall = _context.InvNavDataWithUser.AsNoTracking().FromSql("usp_INVGetNavigation_sel")
                .Select(navdata => new InvNavDataWithUser
                {
                    InvestigationID = navdata.InvestigationID,
                    InvestigationName = navdata.InvestigationName,
                    Priority = navdata.Priority,
                    Country = navdata.Country,
                    Function = navdata.Function,
                    Disposition = navdata.Disposition,
                    MMMDDUsersID = navdata.MMMDDUsersID,
                    User = navdata.User,
                    DateCreatedUTC = navdata.DateCreatedUTC,
                    Aging = navdata.Aging

                });
            // ALL
            // By Aging
            #region By Aging

            var ByAgingAll = (from byaging in barnavall
                              group byaging by byaging.Aging into Grouping
                              select new
                              {
                                  label = ((Grouping.Key == 1) ? "11+ days" : "1-10 days") + " (" + Grouping.Count() + ")",
                                  //data = (Grouping.Key == 1) ? "11+ days" : "1-10 days",
                                  children = from subg in Grouping
                                             group subg by subg.Country into SubGrouping
                                             select new
                                             {
                                                 label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                 //data = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                 data = new
                                                 {
                                                     countryName = SubGrouping.Key,
                                                     aging = Grouping.Key,
                                                 },
                                                 children = from subsubg in SubGrouping
                                                            group subsubg by subsubg.Function into SubSubGrouping
                                                            select new
                                                            {
                                                                label = SubSubGrouping.Key + " (" + SubSubGrouping.Count() + ")",
                                                                data = new
                                                                {
                                                                    countryName = SubGrouping.Key,
                                                                    categoryName = SubSubGrouping.Key,
                                                                    aging = Grouping.Key
                                                                }
                                                            }
                                             }
                              });

            #endregion
            // By Category
            #region By Category
            var ByFunctionAll = (from byfunction in barnavall
                                 group byfunction by new { byfunction.Function, byfunction.Aging } into Grouping
                                 select new
                                 {
                                     label = Grouping.Key.Function + " (" + Grouping.Count() + ")",
                                     data = new 
                                     {
                                         categoryName = Grouping.Key.Function,
                                         aging = Grouping.Key.Aging,
                                     },
                                     children = from subg in Grouping
                                                group subg by subg.Country into SubGrouping
                                                select new
                                                {
                                                    label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                    data = new
                                                    {
                                                        countryName = SubGrouping.Key,
                                                        categoryName = Grouping.Key.Function,
                                                        batchName = "",
                                                        aging = Grouping.Key.Aging
                                                    }
                                                }
                                 });

            #endregion
            // By Country
            #region By Country
            var ByCountryAll = (from bycountry in barnavall
                                group bycountry by new { bycountry.Country, bycountry.Aging } into Grouping
                                select new
                                {
                                    label = Grouping.Key.Country + " (" + Grouping.Count() + ")",
                                    data = new
                                    {
                                        countryName = Grouping.Key.Country,
                                        aging = Grouping.Key.Aging,
                                    },
                                    children = (from subg in Grouping
                                                group subg by subg.Function into SubGrouping
                                                select new
                                                {
                                                    label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                    data = new
                                                    {
                                                        countryName = Grouping.Key.Country,
                                                        categoryName = SubGrouping.Key,
                                                        batchName = "",
                                                        aging = 1
                                                    }
                                                })
                                });

            #endregion

            /*
            var alldata1 = JObject.FromObject(new { label = "Country", data = "Country branch", children = ByCountryAll });
            var alldata2 = JObject.FromObject(new { label = "Category", data = "Category branch", children = ByFunctionAll });
            var alldata3 = JObject.FromObject(new { label = "Aging", data = "Aging branch", children = ByAgingAll });
            var alldata = JObject.FromObject(new { label = "All", children = new JArray(alldata3, alldata1, alldata2) });
        */
            var alldata1 = JObject.FromObject(new { label = "Country", children = ByCountryAll });
            var alldata2 = JObject.FromObject(new { label = "Category", children = ByFunctionAll });
            var alldata3 = JObject.FromObject(new { label = "Aging", children = ByAgingAll });
            var alldata = JObject.FromObject(new { label = "All", children = new JArray(alldata3, alldata1, alldata2) });

            // MY WORK data
            IQueryable<InvNavDataWithUser> barnavuser = _context.InvNavDataWithUser.AsNoTracking().FromSql("usp_INVGetNavigationWithUser_sel {0} ", appUserId)
               .Select(navdata => new InvNavDataWithUser
               {
                   InvestigationID = navdata.InvestigationID,
                   InvestigationName = navdata.InvestigationName,
                   Priority = navdata.Priority,
                   Country = navdata.Country,
                   Function = navdata.Function,
                   Disposition = navdata.Disposition,
                   MMMDDUsersID = navdata.MMMDDUsersID,
                   User = navdata.User,
                   DateCreatedUTC = navdata.DateCreatedUTC,
                   Aging = navdata.Aging

               });
            // By Aging
            #region By Aging
            var ByAgingMy = (from byaging in barnavuser
                             group byaging by byaging.Aging into Grouping
                             select new
                             {
                                 label = ((Grouping.Key == 1) ? "11+ days" : "1-10 days") + " (" + Grouping.Count() + ")",
                                 //data = (Grouping.Key == 1) ? "11+ days" : "1-10 days",
                                 children = from subg in Grouping
                                            group subg by subg.Country into SubGrouping
                                            select new
                                            {
                                                label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                data = new 
                                                {
                                                    countryName = SubGrouping.Key,
                                                    aging = Grouping.Key,
                                                    appUserID = appUserId
                                                },
                                                //data = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                children = from subsubg in SubGrouping
                                                           group subsubg by subsubg.Function into SubSubGrouping
                                                           select new
                                                           {
                                                               label = SubSubGrouping.Key + " (" + SubSubGrouping.Count() + ")",
                                                               data = new
                                                               {
                                                                   countryName = SubGrouping.Key,
                                                                   categoryName = SubSubGrouping.Key,
                                                                   aging = Grouping.Key,
                                                                   appUserID = appUserId
                                                               }
                                                           }
                                            }
                             });

            #endregion
            // By Category
            #region By Category
            var ByFunctionMy = (from byfunction in barnavuser
                                group byfunction by new { byfunction.Function, byfunction.Aging } into Grouping
                                select new
                                {
                                    label = Grouping.Key.Function + " (" + Grouping.Count() + ")",
                                    data = new 
                                    {
                                        categoryName = Grouping.Key.Function,
                                        aging = Grouping.Key.Aging,
                                        appUserID = appUserId
                                    },
                                    children = from subg in Grouping
                                               group subg by subg.Country into SubGrouping
                                               select new
                                               {
                                                   label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                   data = new
                                                   {
                                                       countryName = SubGrouping.Key,
                                                       categoryName = Grouping.Key.Function,
                                                       batchName = "",
                                                       aging = Grouping.Key.Aging,
                                                       appUserID = appUserId
                                                   }
                                               }
                                });

            #endregion
            // By Country
            #region By Country
            var ByCountryMy = (from bycountry in barnavuser
                               group bycountry by new { bycountry.Country, bycountry.Aging } into Grouping
                               select new
                               {
                                   label = Grouping.Key.Country + " (" + Grouping.Count() + ")",
                                   data = new
                                   {
                                       countryName = Grouping.Key.Country,
                                       aging = Grouping.Key.Aging,
                                       appUserID = appUserId
                                   },
                                   children = (from subg in Grouping
                                               group subg by subg.Function into SubGrouping
                                               select new
                                               {
                                                   label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                   data = new
                                                   {
                                                       countryName = Grouping.Key.Country,
                                                       categoryName = SubGrouping.Key,
                                                       batchName = "",
                                                       aging = Grouping.Key.Aging,
                                                       appUserID = appUserId
                                                   }
                                               })
                               });

            #endregion

            var mydata1 = JObject.FromObject(new { label = "Country", children = ByCountryMy });
            var mydata2 = JObject.FromObject(new { label = "Category", children = ByFunctionMy });
            var mydata3 = JObject.FromObject(new { label = "Aging", children = ByAgingMy });

            var mydata = JObject.FromObject(new { label = "My Work", children = new JArray(mydata3, mydata1, mydata2) });

            var result = new JArray(mydata, alldata);

            return result;
            
        }

        /// <summary>
        /// Displays the navigation information on the right panel for Investigations
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public IEnumerable<InvestigationData> GetFilteredInvestigations(InvestigationFilter filter)
        {
            var result = _context.InvestigationData.AsNoTracking()
                    .FromSql("usp_GetInvEntries_sel @countryName={0}, @categoryName={1}, @aging={2}, @appuser={3}", 
                    filter.countryName, 
                    filter.categoryName, 
                    filter.aging, 
                    filter.appUserID)
                    .Select(pg => new InvestigationData
                    {
                        InvestigationID = pg.InvestigationID,
                        Due = pg.Due,
                        Priority = pg.Priority,
                        InvestigationStatusName = pg.InvestigationStatusName,
                        FullName = pg.FullName,
                        DateCreatedUTC = pg.DateCreatedUTC,
                        LastActivityBy = pg.LastActivityBy,
                        LastActivityDate = pg.LastActivityDate,
                        LockedBy = pg.LockedBy,
                        LockedAt = pg.LockedAt,
                        CountryName = pg.CountryName,
                        Category = pg.Category
                    });

            return result;
        }

        public object CheckWorkItemIDForInvestigationEntity(WorkItemPostData postData, IConfiguration configuration)
        {
            bool DataValid = ValidateInvestigationData(postData, configuration);
            if (DataValid == false)
            {
                return null;
            }

            var HRtoken = postData.Token;

            // check for WorkItemID
            var InvestigationEntry = _context.Investigation.Where(t => t.InvestigationID == postData.ModuleTableEntryID);
            if (InvestigationEntry.Count() < 1)
            {
                return null;
            }

            //check if there is an existing WorkItem previously defined
            var DefinedWorkItemGuid = (from inventry in InvestigationEntry
                                       where inventry.WorkItemID != null
                                       select inventry.WorkItemID).FirstOrDefault().ToString();
            int WorkItemCount = 0;

            Guid GuidToSet;

            if (DefinedWorkItemGuid != "")
            {
                GuidToSet = new Guid(DefinedWorkItemGuid.ToString());
            }
            else
            {
                var QueueGuid = (from module in _context.ApplicationModules
                                 where module.ModuleName == EditorialModules.Investigations
                                 select module.QueueGuid).FirstOrDefault();
                var JsonData = JsonConvert.SerializeObject(InvestigationEntry);
                var QueueGuidString = QueueGuid.ToString();

                var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.Investigations,
                    QueueGuidString, JsonData,
                    configuration, null, HRRequestMode.Create);

                var GuidResult = Helper.GetHRWorkItem((WorkItemRequest)HRCreateRequest, HRtoken, configuration);

                if (GuidResult.Value.workItemGuid == null)
                {
                    return null;
                }

                GuidToSet = new Guid(GuidResult.Value.workItemGuid);

                foreach (var investigation in InvestigationEntry)
                {
                    if (investigation.WorkItemID == null)
                    {
                        WorkItemCount += 1;
                        investigation.WorkItemID = GuidToSet;
                    }

                }
                if (WorkItemCount > 0)
                {
                    _context.SaveChanges();
                }
            }
            
            return new { WorkItemGuid = GuidToSet };
        }

        public object GetByGuid(Guid guid)
        {
            var investigationData = base.GetAllIncludingByName("PriorityType", "Country", "FunctionType", 
                "InvestigationDispositions", "InvestigationStatus")
               .Where(x => x.WorkItemID == guid)
               .FirstOrDefault();

            if(investigationData == null)
            {
                return null;
            }

            var thisEntity = _mmmcontext.Entities
                 .Where(x => x.Name.Trim().ToUpper() == investigationData.EntityName.Trim().ToUpper()).FirstOrDefault();

            var Age = 0;

            if (DateTime.TryParse(investigationData.DOB, out DateTime tempDOB))
            {
                var DateOfBirth = Convert.ToDateTime(tempDOB);
                int age = 0;
                age = DateTime.Now.Year - DateOfBirth.Year;
                if (DateTime.Now.DayOfYear < DateOfBirth.DayOfYear)
                    age = age - 1;
                Age = age;
            }
            else
            {
                Age = -1;
            }

            var reasonData = new
            {
                investigationData.Reason,
                Country = (investigationData.CountryOfRecord != "" ? investigationData.CountryOfRecord : "No Country supplied."),
                Age = (Age != -1 ? Age.ToString() : "No valid DOB supplied, age not computed."),
                OtherInfo = (investigationData.OtherInfo != "" ? investigationData.OtherInfo : "No Other Info supplied."),
                Comments = (investigationData.Comments != "" ? investigationData.Comments : "No Comments supplied."),
                Created = (investigationData.DateCreatedUTC.ToString() != "" ? investigationData.DateCreatedUTC.ToString() : "No Created Date supplied."),
                DOB = (investigationData.DOB.ToString() != "" ? investigationData.DOB.ToString() : "No DOB supplied."),
            };

            //notes
            var notes =
                from inote in _context.InvestigationNote
                join user in _context.AppUser on inote.CreatedBy equals user.AppUserID.ToString()
                where inote.InvestigationID == investigationData.InvestigationID
                select new
                {
                    DateCreated = inote.DateCreatedUTC,
                    CreatedBy = user.AppUserName,
                    Note = inote.NoteText
                };

            var activities =
                from act in _context.InvestigationActivity
                join acttype in _context.ActivityType on act.ActivityTypeID equals acttype.ActivityTypeID
                join user in _context.AppUser on act.AppUserID equals user.AppUserID
                where act.InvestigationID == investigationData.InvestigationID
                select new
                {
                    act.DateCreatedUTC,
                    ActivityTypeName = acttype.ActivityTypeName == "View" ? " Record Viewed By " :
                        acttype.ActivityTypeName == "Email" ? " Sent Email " :
                        acttype.ActivityTypeName == "Document" ? " attached on " :
                        " changed from " + act.FromValue + " to " + act.ToValue,
                    user.AppUserName
                };

            var locks = (from recordlock in _context.RecordLocks
                        where recordlock.IDFromWorkUnitsDBTable == investigationData.InvestigationID &&
                        recordlock.WorkUnitTypeID == 3
                        select recordlock).FirstOrDefault();


            var result = new { Investigation = investigationData, Reason = reasonData, Entity = thisEntity, Notes = notes, Activity = activities, Locks = locks };

            return result;
        }

        public InvestigationActivity AddInvestigationActivity(InvestigationDataSave investigationactivity)
        {

            var investigationEntry = investigationactivity.Investigation;

            var targetinvestigationEntry = _context.Investigation.FirstOrDefault(t => t.InvestigationID == investigationEntry.InvestigationID);
            if (targetinvestigationEntry == null)
            {
                return null;
            }

            int ActivityTypeValue = 0;

            if (investigationEntry.PriorityTypeID != targetinvestigationEntry.PriorityTypeID) // Priority change
            {
                ActivityTypeValue = 5; // Priority type, table [ActivityType]
            }
            else if (investigationEntry.CountryID != targetinvestigationEntry.CountryID) // Country change
            {
                ActivityTypeValue = 3; // Country Type, table [ActivityType]
            }
            else if (investigationEntry.InvestigationStatusID != targetinvestigationEntry.InvestigationStatusID) // Status change
            {
                ActivityTypeValue = 2; // Status Type, table [ActivityType]
            }
            else if (investigationEntry.FunctionTypeID != targetinvestigationEntry.FunctionTypeID) // Category change
            {
                ActivityTypeValue = 7; // Category Type, table [ActivityType]
            }
            else if (investigationEntry.InvestigationDispositionsID != targetinvestigationEntry.InvestigationDispositionsID) // Disposition change
            {
                ActivityTypeValue = 6; // Disposition Type, table [ActivityType]
            }
            else
            {
                return null;
            }

            InvestigationActivity newActivity = new InvestigationActivity
            {
                AppUserID = Convert.ToInt32(investigationEntry.UpdatedBy),
                CreatedBy = investigationEntry.UpdatedBy,
                DateCreatedUTC = DateTime.UtcNow,
                UpdatedBy = investigationEntry.UpdatedBy,
                LastUpdatedUTC = DateTime.UtcNow,

                InvestigationID = targetinvestigationEntry.InvestigationID,
                FromValue = investigationEntry.PriorityTypeID.ToString(),
                ToValue = targetinvestigationEntry.PriorityTypeID.ToString(),

                ActivityTypeID = ActivityTypeValue
            };

            _context.InvestigationActivity.Add(newActivity);
            _context.SaveChanges();

            return newActivity;
        }

        public object SendInvestigationEmail(InvestiationEmailRequest emailrequest, IConfiguration configuration)
        {
            if (Helper.ValidEmail(emailrequest.RecipientEmail) == false)
            {
                return null;
            }
            if (emailrequest.Subject.Trim() == "" || emailrequest.Message.Trim() == "" ||
                emailrequest.AppUserID == 0 || emailrequest.IndexFromWorkTable == 0)
            {
                return null;
            }

            var fromEditorialUser = _context.AppUser.Where(x => x.AppUserID == emailrequest.AppUserID).FirstOrDefault();

            if (fromEditorialUser == null)
            {
                return null;
            }
            var SentFrom = fromEditorialUser.Email;

            // Investigation Entry
            var thisInvestigation = _context.Investigation
                .Where(x => x.InvestigationID == emailrequest.IndexFromWorkTable).FirstOrDefault();
            if (thisInvestigation == null)
            {
                return null;
            }

            var SMTPServer = configuration.GetSection("EmailSettings:SMTPServer").Value;
            var SMTPPort = configuration.GetSection("EmailSettings:SMTPPort").Value;
            var InvestigationToEmail = configuration.GetSection("EmailSettings:ToEmail").Value;
            var InvestigationCCEmail = configuration.GetSection("EmailSettings:CCEmail").Value;
            var InvestigationBCCEmail = configuration.GetSection("EmailSettings:BCCEmail").Value;
            var DevEmailAddress = configuration.GetSection("EmailSettings:DevEmailAddress").Value;
            var StatusOrErrorMessage = configuration.GetSection("EmailSettings:StatusOrErrorMessage").Value;
            var ResearchersEmailAddress = configuration.GetSection("EmailSettings:ResearchersEmailAddress").Value;
            var InvestigationEmailSendFromEmailAddress = configuration.GetSection("EmailSettings:SendFromEmailAddress").Value;

            var IsDevelopment = configuration.GetSection("EmailSettings:Development").Value;

            // TO (recipients)
            var SentTo = emailrequest.RecipientEmail;

            if (InvestigationToEmail != "")
            {
                SentTo += ";" + InvestigationToEmail;
            }
            if (InvestigationCCEmail != "")
            {
                SentTo += ";" + InvestigationCCEmail;
            }
            if (InvestigationBCCEmail != "")
            {
                SentTo += ";" + InvestigationBCCEmail;
            }

            var InvestigationEmailEntry = new InvestigationEmails();

            var SentDateUTC = DateTime.UtcNow;
            var DateCreatedUTC = DateTime.UtcNow;
            var LastUpdatedUTC = DateTime.UtcNow;

            var CreatedBy = emailrequest.AppUserID.ToString();
            var UpdatedBy = emailrequest.AppUserID.ToString();

            var Subject = emailrequest.Subject;
            var EmailBody = emailrequest.Message;

            InvestigationEmailEntry.InvestigationID = emailrequest.IndexFromWorkTable;
            InvestigationEmailEntry.AppUserID = emailrequest.AppUserID;
            InvestigationEmailEntry.SentTo = SentTo;
            InvestigationEmailEntry.SentFrom = SentFrom;
            InvestigationEmailEntry.Subject = Subject;
            InvestigationEmailEntry.EmailBody = EmailBody;
            InvestigationEmailEntry.StatusOrErrorMessage = StatusOrErrorMessage;
            InvestigationEmailEntry.SentDateUTC = SentDateUTC;
            InvestigationEmailEntry.CreatedBy = CreatedBy;
            InvestigationEmailEntry.DateCreatedUTC = DateCreatedUTC;
            InvestigationEmailEntry.UpdatedBy = UpdatedBy;
            InvestigationEmailEntry.LastUpdatedUTC = LastUpdatedUTC;

            _context.InvestigationEmails.Add(InvestigationEmailEntry);

            // Log Activity
            var thisActivity = new InvestigationActivity
            {
                InvestigationID = thisInvestigation.InvestigationID,
                ActivityTypeID = 8, //Email Sent Activity Type
                AppUserID = fromEditorialUser.AppUserID,
                FromValue = "",
                ToValue = "Sent Email",
                CreatedBy = CreatedBy,
                DateCreatedUTC = DateCreatedUTC,
                UpdatedBy = UpdatedBy,
                LastUpdatedUTC = LastUpdatedUTC
            };

            _context.SaveChanges();

            _context.InvestigationActivity.Add(thisActivity);

            // dummy, comment/delete when ready
            SentFrom = "santa@northpole.com";
            SentTo = "santa@northpole.com";

            Helper.SendMail(SMTPServer, SentFrom, SentTo, "", "", Subject, EmailBody);

            return EmailBody;
        }

        public object UpdateInvestigationEntity(InvestigationDataSave investigationdata, IConfiguration configuration)
        {
            bool DataValid = ValidateInvestigationEntity(investigationdata, configuration);
            if (DataValid == false)
            {
                return null;
            }

            var InvestigationDataUpdateEntry = investigationdata.Investigation;

            var InvestigationDataEntry = _context.Investigation.FirstOrDefault(t => t.InvestigationID == InvestigationDataUpdateEntry.InvestigationID);
            if (InvestigationDataEntry == null)
            {
                return null;
            }

            /*
           3	Investigation
           4	Alerts
           5	News Queue
           6	BWQ
           */
            var Locks = _context.RecordLocks
                .Where(v => v.WorkUnitTypeID == 3 && v.IDFromWorkUnitsDBTable == InvestigationDataUpdateEntry.InvestigationID);

            foreach (var lockeentry in Locks)
            {
                if (lockeentry.AppUserID != Convert.ToInt32(InvestigationDataUpdateEntry.UpdatedBy)) // record lock found for another user
                {
                    return null;
                }

                if (lockeentry != null)
                {
                    _context.RecordLocks.Remove(lockeentry);
                }
            }

            // Update the Editorial data

            var InvestigationID = InvestigationDataUpdateEntry.InvestigationID;
            var MMMProfileID = InvestigationDataUpdateEntry.EntityName;
            var WorkItemGuid = InvestigationDataUpdateEntry.WorkItemID.ToString();

            _context.Entry(InvestigationDataEntry).CurrentValues.SetValues(InvestigationDataUpdateEntry);

            // Save Notes
            if (investigationdata.InvestigationNote != null)
            {
                _context.InvestigationNote.Add(investigationdata.InvestigationNote);
            }

            _context.SaveChanges();

            // Human Review routines

            var QueueGuid = (from module in _context.ApplicationModules
                             where module.ModuleName == EditorialModules.Investigations
                             select module.QueueGuid).FirstOrDefault();

            var QueueGuidString = QueueGuid.ToString();

            var JsonData = JsonConvert.SerializeObject(InvestigationDataUpdateEntry);

            var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.Investigations,
                   QueueGuidString, JsonData,
                   configuration, WorkItemGuid, HRRequestMode.Update);

            var GuidResult = Helper.PutHRWorkItem((WorkItemPutRequest)HRCreateRequest, investigationdata.HRToken, configuration);


            return InvestigationDataUpdateEntry;

        }

        private bool ValidateInvestigationEntity(InvestigationDataSave investigationdata, IConfiguration configuration)
        {
            JwtSecurityToken HRToken = new JwtSecurityToken(investigationdata.HRToken);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }
            if (investigationdata.Investigation == null)
            {
                return false;
            }

            // Check if HR is up before calling HR routines
            var hrResponse = Helper.GetHRServerStatus(configuration);
            // We expect a 400 - Bad Request, if 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                return false;
            }

            return true;
        }

        private bool ValidateInvestigationData(WorkItemPostData postData, IConfiguration configuration)
        {

            JwtSecurityToken HRToken = new JwtSecurityToken(postData.Token);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }
            if (postData.ModuleTableEntryID == 0)
            {
                return false;
            }
            if (postData.ProfileId == "")
            {
                return false;
            }

            // Check if HR is up before calling HR routines
            var hrResponse = Helper.GetHRServerStatus(configuration);
            // We expect a 400 - Bad Request, if 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                return false;
            }

            return true;
        }


    }
}
