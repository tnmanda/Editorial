using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test
{
    public class AlertJobsQueueTest
    {
        [Fact]
        public void AlertJobsQueue()
        {
            IQueryable<AlertJobsQueue> AlertJobsQueueCollection = Enumerable.Empty<AlertJobsQueue>().AsQueryable();
            IEnumerable<CollectionItem> CollectionItems = Enumerable.Empty<CollectionItem>();

            AlertJobsQueue ct = new AlertJobsQueue { AlertJobsQueueID = 1, CreatedBy = "Test AlertJobsQueue" };
            
            Mock<IAlertJobsQueueRepository> AlertJobsQueueService = new Mock<IAlertJobsQueueRepository>();



            object obj = new object();

            try
            {
                AlertJobsQueueService.Setup(x => x.GetAll()).Returns(AlertJobsQueueCollection);
                AlertJobsQueueService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AlertJobsQueueService.Setup(x => x.Add(It.IsAny<AlertJobsQueue>())).Returns(ct);
                AlertJobsQueueService.Setup(x => x.Delete(It.IsAny<AlertJobsQueue>())).Verifiable();
                AlertJobsQueueService.Setup(x => x.Update(It.IsAny<AlertJobsQueue>(), It.IsAny<object>())).Returns(ct);
                AlertJobsQueueService.Setup(x => x.GetAlertDisposition()).Returns(CollectionItems);
                AlertJobsQueueService.Setup(x => x.GetAlertStatus()).Returns(CollectionItems);
                AlertJobsQueueService.Setup(x => x.GetAlertPriority()).Returns(CollectionItems);

                var AlertJobsQueueObject = AlertJobsQueueService.Object;
                var p1 = AlertJobsQueueObject.GetAll();
                var p2 = AlertJobsQueueObject.Get(1);
                var p3 = AlertJobsQueueObject.Update(ct, obj);
                var p4 = AlertJobsQueueObject.Add(ct);
                AlertJobsQueueObject.Delete(ct);
                var p5 = AlertJobsQueueObject.GetAlertDisposition();
                var p6 = AlertJobsQueueObject.GetAlertStatus();
                var p7 = AlertJobsQueueObject.GetAlertPriority();


                Assert.IsAssignableFrom<IQueryable<AlertJobsQueue>>(p1);
                Assert.IsAssignableFrom<AlertJobsQueue>(p2);
                Assert.Equal("Test AlertJobsQueue", p2.CreatedBy);
                Assert.Equal("Test AlertJobsQueue", p3.CreatedBy);
                Assert.IsAssignableFrom<IEnumerable<CollectionItem>>(p5);
                Assert.IsAssignableFrom<IEnumerable<CollectionItem>>(p6);
                Assert.IsAssignableFrom<IEnumerable<CollectionItem>>(p7);

                AlertJobsQueueService.VerifyAll();

                AlertJobsQueueObject.Dispose();
            }
            finally
            {
                AlertJobsQueueService = null;
            }
        }
    }
}
