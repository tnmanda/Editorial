using Microsoft.EntityFrameworkCore;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Admin.Page;
//using Microsoft.EntityFrameworkCore.Proxies;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.INV;
using LNWCOE.Models.ALERTS;
using LNWCOE.Models.News;
using LNWCOE.Models;
using LNWCOE.Helpers;
using System;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace LNWCOE.Data
{
    public class AppDbContext : DbContext
    {
        private readonly ILogger<AppDbContext> _logger;

        public AppDbContext(DbContextOptions<AppDbContext> options, ILogger<AppDbContext> logger) : base(options)
        {
            this._logger = logger;
        }

        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<UserDisplay> UserDisplay { get; set; }

        // Editorial to LNAA user map
        public DbSet<HREditorialUserMap> HREditorialUserMap { get; set; }
        public DbSet<HRWorkItemDataMap> HRWorkItemDataMap { get; set; }
        

        //Application Modules
        public DbSet<ApplicationModules> ApplicationModules { get; set; }
        
        // Lookups
        public DbSet<Office> Office { get; set; }
        public DbSet<GenderType> GenderType { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<Team> Team { get; set; }

        // Type Lookups
        public DbSet<EducationType> EducationType { get; set; }
        public DbSet<OperationalRoleType> OperationalRoleType { get; set; }
        public DbSet<RoleType> RoleType { get; set; }
        public DbSet<AbsenceType> AbsenceType { get; set; }
        public DbSet<AddressType> AddressType { get; set; }
        public DbSet<CertificateType> CertificateType { get; set; }
        public DbSet<ContactType> ContactType { get; set; }
        public DbSet<ContractType> ContractType { get; set; }
        public DbSet<DepartureType> DepartureType { get; set; }
        public DbSet<FunctionType> FunctionType { get; set; }
        public DbSet<LanguageType> LanguageType { get; set; }
        public DbSet<ProficiencyType> ProficiencyType { get; set; }
        public DbSet<WorkUnitType> WorkUnitType { get; set; }
        public DbSet<AssignmentType> AssignmentType { get; set; }

        // User Related
        public DbSet<AppUserAbsence> AppUserAbsence { get; set; }
        public DbSet<AppUserAddress> AppUserAddress { get; set; }
        public DbSet<AppUserCertificate> AppUserCertificate { get; set; }
        public DbSet<AppUserContact> AppUserContact { get; set; }

        public DbSet<AppUserContract> AppUserContract { get; set; }
        public DbSet<AppUserCountry> AppUserCountry { get; set; }
        public DbSet<AppUserEducation> AppUserEducation { get; set; }
        public DbSet<AppUserEmploymentRecord> AppUserEmploymentRecord { get; set; }

        public DbSet<AppUserFunction> AppUserFunction { get; set; }
        public DbSet<AppUserInRole> AppUserInRole { get; set; }
        public DbSet<AppUserLanguage> AppUserLanguage { get; set; }
        public DbSet<AppUserNote> AppUserNote { get; set; }

        public DbSet<AppUserResearchTeam> AppUserResearchTeam { get; set; }
        public DbSet<AppUserTeam> AppUserTeam { get; set; }
        public DbSet<AppUserTeamAssignment> AppUserTeamAssignment { get; set; }

        // pages
        public DbSet<Pages> Pages { get; set; }
        public DbSet<PagesEx> PagesEx { get; set; }
        public DbSet<PageInUserRole> PageInUserRole { get; set; }
        public DbSet<PagesGroups> PagesGroups { get; set; }
        public DbSet<ParentGroup> ParentGroup { get; set; }

        // job control related
        public DbSet<AlertSourceType> AlertSourceType { get; set; }
        public DbSet<Encoding> Encoding { get; set; }
        public DbSet<AlertWorkers> AlertWorkers { get; set; }
        public DbSet<AlertSchedules> AlertSchedules { get; set; }
        public DbSet<AlertScheduleType> AlertScheduleType { get; set; }

        // Record Locks
        public DbSet<RecordLocks> RecordLocks { get; set; }
        public DbSet<WorkUnitLockDurationInMin> WorkUnitLockDurationInMin { get; set; }
        
        // BWQ
        public DbSet<BWQ> BWQ { get; set; }
        public DbSet<BWQDispositions> BWQDispositions { get; set; }
        public DbSet<BWQEntities> BWQEntities { get; set; }
        public DbSet<BWQFieldSelect> BWQFieldSelect { get; set; }
        public DbSet<BWQInstructions> BWQInstructions { get; set; }
        public DbSet<BWQStatusType> BWQStatusType { get; set; }
        public DbSet<CollectionItem> CollectionItem { get; set; }
        public DbSet<Collection> Collection { get; set; }
        public DbSet<BWQEntity> BWQEntity { get; set; }

        public DbSet<BwqNavData> BwqNavData { get; set; }
        public DbSet<BwqNavDataWithUser> BwqNavDataWithUser { get; set; }

        // Investigations
        public DbSet<InvestigationStatus> InvestigationStatus { get; set; }
        public DbSet<InvestigationNote> InvestigationNote { get; set; }
        public DbSet<InvestigationDispositions> InvestigationDispositions { get; set; }
        public DbSet<InvestigationCategory> InvestigationCategory { get; set; }
        public DbSet<InvestigationActivity> InvestigationActivity { get; set; }
        public DbSet<Investigation> Investigation { get; set; }
        public DbSet<PriorityType> PriorityType { get; set; }
        public DbSet<ActivityType> ActivityType { get; set; }
        public DbSet<InvNavDataWithUser> InvNavDataWithUser { get; set; }
        public DbSet<InvestigationData> InvestigationData { get; set; }
        public DbSet<InvestigationEntity> InvestigationEntity { get; set; }
        public DbSet<InvestigationEmails> InvestigationEmails { get; set; }

        // Alerts
        public DbSet<AlertJobs> AlertJobs { get; set; }
        public DbSet<AlertNames> AlertNames { get; set; }
        public DbSet<AlertNameDetail> AlertNameDetail { get; set; }
        public DbSet<AlertNamesDisposition> AlertNamesDisposition { get; set; }
        public DbSet<EmailPool> EmailPool { get; set; }

        public DbSet<AlertJobsNav> AlertJobsNav { get; set; }
        public DbSet<AlertDispositionType> AlertDispositionType { get; set; }
        public DbSet<AlertJobData> AlertJobData { get; set; }
        public DbSet<AlertJobFilterData> AlertJobFilterData { get; set; }
        

        public DbSet<AlertJobsQueueEntity> AlertJobsQueueEntity { get; set; }
        public DbSet<AlertJobsQueue> AlertJobsQueue { get; set; }
        public DbSet<PastDueAlert> PastDueAlert { get; set; }
        
        //NEws 
        public DbSet<NewsStatus> NewsStatus { get; set; }
        public DbSet<NewsJobsNav> NewsJobsNav { get; set; }
        public DbSet<NewsData> NewsData { get; set; }
        

        public ReturnData SaveData()
        {
            int ret = -1;
            var saveData = new ReturnData();
            
            try
            {
                ret = base.SaveChanges();

                saveData.Code = ret;
                saveData.Message = "Success";
            }
            catch (DbUpdateException dbexception)
            {
                string dbError = ($"DbUpdateException error details - {dbexception.InnerException.Message}");

                saveData.Message = dbError + " - " + dbexception.InnerException.HResult;
                saveData.Code = dbexception.InnerException.HResult;
                saveData.guid = Guid.NewGuid();

                this._logger.LogError(saveData.guid + " - " + dbError);
            }
            return saveData;
        }
    }
}
