using System;
using System.Collections.Generic;
using LNWCOE.Models.HR;
using LNWCOE.Models.Investigations;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;

namespace LNWCOE.Module.Investigations.Interface
{
    public interface IInvestigationRepository : IRepository<Investigation>
    {
        IEnumerable<Investigation> GetAllIncludingByName();
        Investigation GetIdIncluding(int id);
        object GetNavigationsWithCounts(int appUserId);
        IEnumerable<InvestigationData> GetFilteredInvestigations(InvestigationFilter filter);

        object CheckWorkItemIDForInvestigationEntity(WorkItemPostData postData, IConfiguration configuration);
        object GetByGuid(Guid guid);
        InvestigationActivity AddInvestigationActivity(InvestigationDataSave investigationactivity);
        object SendInvestigationEmail(InvestiationEmailRequest emailrequest, IConfiguration configuration);
        object UpdateInvestigationEntity(InvestigationDataSave investigationdata, IConfiguration configuration);
    }
}
