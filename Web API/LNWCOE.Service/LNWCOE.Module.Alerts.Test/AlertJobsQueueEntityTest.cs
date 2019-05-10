using System;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.HR;
using LNWCOE.Module.Alerts.Interface;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test
{
    public class AlertJobsQueueEntityTest
    {
        [Fact]
        public void AlertJobsQueueEntity()
        {

            IEnumerable<AlertJobFilterData> AlertJobFilterDataItems = Enumerable.Empty<AlertJobFilterData>();
            object t = new object();
            AlertJobsQueueEntityData data = new AlertJobsQueueEntityData();
            AlertJobsQueueEntity dataEntity = new AlertJobsQueueEntity();
            AlertJobFilter filter = new AlertJobFilter();
            Mock<IAlertJobsQueueEntityRepository> AlertJobsQueueEntityService = new Mock<IAlertJobsQueueEntityRepository>();
            Guid guid = new Guid();
            IConfiguration config = null;
            WorkItemPostData wrkitemdata = new WorkItemPostData();
            AlertJobsQueueEntityDataSave datasave = new AlertJobsQueueEntityDataSave();

            object obj = new object();

            try
            {
                AlertJobsQueueEntityService.Setup(x => x.GetAlertBatchItems()).Returns(t);
                AlertJobsQueueEntityService.Setup(x => x.GetFilteredAlertEntities(It.IsAny<AlertJobFilter>())).Returns(AlertJobFilterDataItems);
                AlertJobsQueueEntityService.Setup(x => x.CheckWorkItemIDForEntity(It.IsAny<WorkItemPostData>(), It.IsAny<IConfiguration>()))
                    .Returns(t);
                AlertJobsQueueEntityService.Setup(x => x.GetByGuid(It.IsAny<Guid>())).Returns(data);
                AlertJobsQueueEntityService.Setup(x => x.UpdateEntry(It.IsAny<AlertJobsQueueEntityDataSave>(), It.IsAny<IConfiguration>()))
                    .Returns(dataEntity);

                var AlertJobsQueueEntityObject = AlertJobsQueueEntityService.Object;
                var p1 = AlertJobsQueueEntityObject.GetAlertBatchItems();
                var p2 = AlertJobsQueueEntityObject.GetFilteredAlertEntities(filter);
                var p3 = AlertJobsQueueEntityObject.GetByGuid(guid);

                var p4 = AlertJobsQueueEntityObject.CheckWorkItemIDForEntity(wrkitemdata, config);
                var p5 = AlertJobsQueueEntityObject.UpdateEntry(datasave, config);


                Assert.IsAssignableFrom<object>(p1);
                Assert.IsAssignableFrom<IEnumerable<AlertJobFilterData>>(p2);
                Assert.IsAssignableFrom<AlertJobsQueueEntityData>(p3);
                Assert.IsAssignableFrom<object>(p4);
                Assert.IsAssignableFrom<AlertJobsQueueEntity>(p5);

                AlertJobsQueueEntityService.VerifyAll();

                AlertJobsQueueEntityObject.Dispose();
            }
            finally
            {
                AlertJobsQueueEntityService = null;
            }
        }
    }
}
