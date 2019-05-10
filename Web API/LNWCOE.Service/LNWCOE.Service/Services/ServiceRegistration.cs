using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;
using LNWCOE.Service.Helpers;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Implementation;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Module.Alerts.Interface;
using LNWCOE.Module.Alerts.Implementation;
using LNWCOE.Module.BWQ.Implementation;
using LNWCOE.Module.BWQ.Interface;
using LNWCOE.Module.Investigations.Interface;
using LNWCOE.Module.News.Interface;
using LNWCOE.Module.News.Implementation;

namespace LNWCOE.Service.Services
{
    public class ServiceRegistration
    {
        public static void RegisterServices(IServiceCollection services, IConfigurationRoot config)
        {
            // Cors
            ConfigureCors(services);
            //MVC
            services.AddMvc()
               .AddJsonOptions(options =>
               {
                   options.SerializerSettings.Formatting = Formatting.Indented;
               });
            // Jason Token Authorizations
            JwtAuthorization(services, config);
            // Data
            AddContexts(services, config);
            // Model Validation Attribute
            services.AddScoped<ValidateModelAttribute>();
        }
        protected static void AddContexts(IServiceCollection services, IConfigurationRoot config)
        {
            // DB Context
            services.AddDbContext<EditorialDataContext>(options => options.UseSqlServer(config.GetConnectionString("LNWCOEDB")));
            services.AddDbContext<MMMDataContext>(options => options.UseSqlServer(config.GetConnectionString("MMMDB")));
            services.AddDbContext<NewsFeedDataContext>(options => options.UseSqlServer(config.GetConnectionString("NewsFeedDB")));

            // NewsFeed
            services.AddScoped<IFeeder_FeedArtiklesRepository, Feeder_FeedArtiklesRepository>();
            services.AddScoped<IFeeder_watchesRepository, Feeder_watchesRepository>();
            services.AddScoped<IFeeder_WatchKeywordsRepository, Feeder_WatchKeywordsRepository>();
            services.AddScoped<IFeedItemQueueLocksRepository, FeedItemQueueLocksRepository>();
            services.AddScoped<IFeedItemQueueRepository, FeedItemQueueRepository>();
            services.AddScoped<INewsStatusRepository, NewsStatusRepository>();
            services.AddScoped<IFeeder_FeedArtiklesRepository, Feeder_FeedArtiklesRepository>();
            services.AddScoped<INewsRepository, NewsRepository>();
            

            // Investigations
            services.AddScoped<IActivityTypeRepository, ActivityTypeRepository>();
            services.AddScoped<IInvestigationRepository, InvestigationRepository>();
            services.AddScoped<IInvestigationActivityRepository, InvestigationActivityRepository>();
            services.AddScoped<IInvestigationCategoryRepository, InvestigationCategoryRepository>();
            services.AddScoped<IInvestigationDispositionsRepository, InvestigationDispositionsRepository>();
            services.AddScoped<IInvestigationEmailsRepository, InvestigationEmailsRepository>();
            services.AddScoped<IInvestigationEntityRepository, InvestigationEntityRepository>();
            services.AddScoped<IInvestigationNoteRepository, InvestigationNoteRepository>();
            services.AddScoped<IInvestigationStatusRepository, InvestigationStatusRepository>();
            services.AddScoped<IPriorityTypeRepository, PriorityTypeRepository>();


            //BWQ
            services.AddScoped<IBWQStatusTypeRepository, BWQStatusTypeRepository>();
            services.AddScoped<IBWQFieldSelectRepository, BWQFieldSelectRepository>();
            services.AddScoped<IBWQDispositionsRepository, BWQDispositionsRepository>();
            services.AddScoped<IBWQEntitiesRepository, BWQEntitiesRepository>();
            services.AddScoped<IBWQInstructionsRepository, BWQInstructionsRepository>();
            services.AddScoped<IBWQRepository, BWQRepository>();
            // MMM objects
            services.AddScoped<IEntitiesRepository, EntitiesRepository>();
            services.AddScoped<IEntitiesLevelsRepository, EntitiesLevelsRepository>();
            services.AddScoped<IEntitiesSubCategoriesRepository, EntitiesSubCategoriesRepository>();
            services.AddScoped<IEntitiesCategoriesRepository, EntitiesCategoriesRepository>();
            services.AddScoped<IEntitiesSourcesRepository, EntitiesSourcesRepository>();
                

            //Alerts
            //Job Control Related
            services.AddScoped <IAlertSchedulesRepository, AlertSchedulesRepository>();
            services.AddScoped <IAlertScheduleTypeRepository, AlertScheduleTypeRepository>();
            services.AddScoped <IAlertSourceTypeRepository, AlertSourceTypeRepository>();
            services.AddScoped <IAlertWorkersRepository, AlertWorkersRepository>();
            services.AddScoped <IEncodingRepository, EncodingRepository>();
            //
            services.AddScoped<IAlertJobsRepository, AlertJobsRepository>();
            services.AddScoped<IAlertNamesRepository, AlertNamesRepository>();
            services.AddScoped<IAlertJobsQueueRepository, AlertJobsQueueRepository>();
            services.AddScoped<IAlertJobsQueueEntityRepository, AlertJobsQueueEntityRepository>();
            
            // User Related
            services.AddScoped<IAppUserRepository, AppUserRepository>();
            services.AddScoped<IAppUserAbsenceRepository, AppUserAbsenceRepository>();
            services.AddScoped<IAppUserAddressRepository, AppUserAddressRepository>();
            services.AddScoped<IAppUserCertificateRepository, AppUserCertificateRepository>();
            services.AddScoped<IAppUserContactRepository, AppUserContactRepository>();
            services.AddScoped<IAppUserContractRepository, AppUserContractRepository>();
            services.AddScoped<IAppUserCountryRepository, AppUserCountryRepository>();
            services.AddScoped<IAppUserEducationRepository, AppUserEducationRepository>();
            services.AddScoped<IAppUserEmploymentRecordRepository, AppUserEmploymentRecordRepository>();
            services.AddScoped<IAppUserFunctionRepository, AppUserFunctionRepository>();
            services.AddScoped<IAppUserLanguageRepository, AppUserLanguageRepository>();
            services.AddScoped<IAppUserNoteRepository, AppUserNoteRepository>();
            services.AddScoped<IAppUserResearchTeamRepository, AppUserResearchTeamRepository>();
            services.AddScoped<IAppUserTeamRepository, AppUserTeamRepository>();
            services.AddScoped<IAppUserTeamAssignmentRepository, AppUserTeamAssignmentRepository>();

            // Miscellaneous
            services.AddScoped<IApplicationModulesRepository, ApplicationModulesRepository>();
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<IHREditorialUserMapRepository, HREditorialUserMapRepository>();
            services.AddScoped<IHRWorkItemDataMapRepository, HRWorkItemDataMapRepository>();
            services.AddScoped<IOfficeRepository, OfficeRepository>();
            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddScoped<IRecordLocksRepository, RecordLocksRepository>();
            services.AddScoped<IWorkUnitLockDurationInMinRepository, WorkUnitLockDurationInMinRepository>();
            services.AddScoped<ICollectionRepository, CollectionRepository>();
            services.AddScoped<ICollectionItemRepository, CollectionItemRepository>();

            //Types
            services.AddScoped<IAppUserInRoleRepository, AppUserInRoleRepository>();
            services.AddScoped<IAbsenceTypeRepository, AbsenceTypeRepository>();
            services.AddScoped<IAddressTypeRepository, AddressTypeRepository>();
            services.AddScoped<IAssignmentTypeRepository, AssignmentTypeRepository>();
            services.AddScoped<ICertificateTypeRepository, CertificateTypeRepository>();
            services.AddScoped<IContactTypeRepository, ContactTypeRepository>();
            services.AddScoped<IContractTypeRepository, ContractTypeRepository>();
            services.AddScoped<IDepartureTypeRepository, DepartureTypeRepository>();
            services.AddScoped<IEducationTypeRepository, EducationTypeRepository>();
            services.AddScoped<IFunctionTypeRepository, FunctionTypeRepository>();
            services.AddScoped<IGenderTypeRepository, GenderTypeRepository>();
            services.AddScoped<ILanguageTypeRepository, LanguageTypeRepository>();
            services.AddScoped<IOperationalRoleTypeRepository, OperationalRoleTypeRepository>();
            services.AddScoped<IProficiencyTypeRepository, ProficiencyTypeRepository>();
            services.AddScoped<IRoleTypeRepository, RoleTypeRepository>();
            services.AddScoped<IWorkUnitTypeRepository, WorkUnitTypeRepository>();

            //Page Related
            services.AddScoped<IPageRepository, PageRepository>();
            services.AddScoped<IPageInUserRoleRepository, PageInUserRoleRepository>();
            services.AddScoped<IParentGroupRepository, ParentGroupRepository>();
            services.AddScoped<IPagesGroupsRepository, PagesGroupsRepository>();

       
            



        }


        public static void ConfigureCors(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder => { builder.AllowAnyOrigin(); });
                options.AddPolicy("AllowAllMethods", builder => { builder.AllowAnyMethod(); });
                options.AddPolicy("AllowAllHeaders", builder => { builder.AllowAnyHeader(); });
            });
        }

        protected static void JwtAuthorization(IServiceCollection services, IConfigurationRoot config)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                string TokenKey = config["TokenValues:key"];
                string TokenIssuer = config["TokenValues:issuer"];
                string TokenAudience = config["TokenValues:audience"];

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidIssuer = TokenIssuer,
                    ValidAudience = TokenAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenKey))
                };
            });
        }

        

    }
}
