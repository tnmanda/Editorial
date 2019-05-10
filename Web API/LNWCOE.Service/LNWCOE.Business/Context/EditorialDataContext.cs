using LNWCOE.Models.Admin;
using LNWCOE.Models.Admin.Pages;
using Microsoft.EntityFrameworkCore;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.Investigations;
using LNWCOE.Models.News;

namespace LNWCOE.Models.Context
{
    public class EditorialDataContext : DbContext
    {
        public EditorialDataContext(DbContextOptions<EditorialDataContext> options) : base(options) { }

        // Investigations
        public DbSet<ActivityType> ActivityType { get; set; }
        public DbSet<Investigation> Investigation { get; set; }
        public DbSet<InvestigationActivity> InvestigationActivity { get; set; }
        public DbSet<InvestigationCategory> InvestigationCategory { get; set; }
        public DbSet<InvestigationDispositions> InvestigationDispositions { get; set; }
        public DbSet<InvestigationEmails> InvestigationEmails { get; set; }
        public DbSet<InvestigationEntity> InvestigationEntity { get; set; }
        public DbSet<InvestigationNote> InvestigationNote { get; set; }
        public DbSet<InvestigationStatus> InvestigationStatus { get; set; }
        public DbSet<PriorityType> PriorityType { get; set; }
        public DbSet<InvNavDataWithUser> InvNavDataWithUser { get; set; }
        public DbSet<InvestigationData> InvestigationData { get; set; }

        // BWQ
        public DbSet<Bwq> Bwq { get; set; }
        public DbSet<BWQStatusType> BWQStatusType { get; set; }
        public DbSet<BWQFieldSelect> BWQFieldSelect { get; set; }
        public DbSet<BWQDispositions> BWQDispositions { get; set; }
        public DbSet<BwqNavDataWithUser> BwqNavDataWithUser { get; set; }
        public DbSet<BwqNavData> BwqNavData { get; set; }
        public DbSet<BWQEntities> BWQEntities { get; set; }
        public DbSet<BWQInstructions> BWQInstructions { get; set; }
        public DbSet<BWQEntityData> BWQEntityData { get; set; }

        // Alerts
        // Job Control
        public DbSet<AlertSchedules> AlertSchedules { get; set; }
        public DbSet<AlertScheduleType> AlertScheduleType { get; set; }
        public DbSet<AlertSourceType> AlertSourceType { get; set; }
        public DbSet<AlertWorkers> AlertWorkers { get; set; }
        public DbSet<Encoding> Encoding { get; set; }
        // 
        public DbSet<AlertJobs> AlertJobs { get; set; }
        public DbSet<PastDueAlert> PastDueAlert { get; set; }
        public DbSet<AlertNames> AlertNames { get; set; }
        public DbSet<AlertNamesDisposition> AlertNamesDisposition { get; set; }


        public DbSet<AlertJobsQueue> AlertJobsQueue { get; set; }
        public DbSet<AlertJobsQueueEntity> AlertJobsQueueEntity { get; set; }
        public DbSet<AlertJobData> AlertJobData { get; set; }
        public DbSet<AlertJobsNav> AlertJobsNav { get; set; }
        public DbSet<AlertJobsNav_v1> AlertJobsNav_v1 { get; set; }
        

        public DbSet<AlertJobFilterData> AlertJobFilterData { get; set; }
        public DbSet<AlertJobFilterData_v1> AlertJobFilterData_v1 { get; set; }

        // Miscellaneous
        public DbSet<ApplicationModules> ApplicationModules { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<HREditorialUserMap> HREditorialUserMap { get; set; }
        public DbSet<HRWorkItemDataMap> HRWorkItemDataMap { get; set; }
        public DbSet<Office> Office { get; set; }
        public DbSet<Team> Team { get; set; }
        public DbSet<RecordLocks> RecordLocks { get; set; }
        public DbSet<WorkUnitLockDurationInMin> WorkUnitLockDurationInMin { get; set; }
        public DbSet<Collection> Collection { get; set; }
        public DbSet<CollectionItem> CollectionItem { get; set; }
        public DbSet<NewsStatus> NewsStatus { get; set; }
        public DbSet<NewsJobsNav> NewsJobsNav { get; set; }
        public DbSet<NewsData> NewsData { get; set; }

        //User Related
        public DbSet<AppUser> AppUser { get; set; }
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
        public DbSet<UserDisplay> UserDisplay { get; set; }

        // Page Related
        public DbSet<Pages> Pages { get; set; }
        public DbSet<PageInUserRole> PageInUserRole { get; set; }
        public DbSet<PagesEx> PagesEx { get; set; }
        public DbSet<ParentGroup> ParentGroup { get; set; }
        public DbSet<PagesGroups> PagesGroups { get; set; }

        //Types
        public DbSet<AbsenceType> AbsenceType { get; set; }
        public DbSet<AddressType> AddressType { get; set; }
        public DbSet<AssignmentType> AssignmentType { get; set; }
        public DbSet<CertificateType> CertificateType { get; set; }
        public DbSet<ContactType> ContactType { get; set; }
        public DbSet<ContractType> ContractType { get; set; }
        public DbSet<DepartureType> DepartureType { get; set; }
        public DbSet<EducationType> EducationType { get; set; }
        public DbSet<FunctionType> FunctionType { get; set; }
        public DbSet<GenderType> GenderType { get; set; }
        public DbSet<LanguageType> LanguageType { get; set; }
        public DbSet<OperationalRoleType> OperationalRoleType { get; set; }
        public DbSet<ProficiencyType> ProficiencyType { get; set; }
        public DbSet<RoleType> RoleType { get; set; }
        public DbSet<WorkUnitType> WorkUnitType { get; set; }
        
    }
}
