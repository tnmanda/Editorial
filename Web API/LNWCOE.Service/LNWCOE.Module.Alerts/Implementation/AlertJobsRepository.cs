using System;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Module.Alerts.Interface;
using Microsoft.EntityFrameworkCore;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Implementation
{
    public class AlertJobsRepository : Repository<AlertJobs>, IAlertJobsRepository
    {
        private new readonly EditorialDataContext _context;

        public AlertJobsRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AlertJobs> GetAllIncludingByName()
        {
            var data = GetAllIncludingByName("Country", "Team", "AlertSourceType");
            
            return data;
        }

        public AlertJobs GetIdIncluding(int id)
        {
            var query = GetAllIncludingByName("Country", "Team", "AlertSourceType")
                .Where(x => x.AlertJobsID == id)
                .FirstOrDefault();

            return query;
        }

        public IEnumerable<AlertJobs> InActiveAlerts()
        {
            var TwoWeeksAgo = DateTime.UtcNow.AddDays(-14);

            var query = GetAllIncludingByName("Country", "Team", "AlertSourceType")
                .Where(x => x.IsActive == true && x.DateCreatedUTC < TwoWeeksAgo);

            return query;

        }

        public IEnumerable<PastDueAlert> GetPastDueAlerts()
        {
            var data = _context.PastDueAlert.AsNoTracking().FromSql("usp_GetPastDueAlerts_sel")
              .Select(navdata => new PastDueAlert
              {
                  AlertJobQueueID = navdata.AlertJobQueueID,
                  JobId = navdata.JobId,
                  JobName = navdata.JobName,
                  DueDate = navdata.DueDate,
                  DateCreated = navdata.DateCreated,
                  Source = navdata.Source
              });

            return data;
        }
    }
}
