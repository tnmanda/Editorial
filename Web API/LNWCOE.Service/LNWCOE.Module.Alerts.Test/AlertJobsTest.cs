using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test
{
    public class AlertJobsTest
    {
        [Fact]
        public void AlertJobs()
        {
            IQueryable<AlertJobs> AlertJobsCollection = Enumerable.Empty<AlertJobs>().AsQueryable();
            AlertJobs ct = new AlertJobs { AlertJobsID = 1,  JobName = "Test AlertJobs" };

            Mock<IAlertJobsRepository> AlertJobsService = new Mock<IAlertJobsRepository>();

            object obj = new object();

            try
            {
                AlertJobsService.Setup(x => x.GetAll()).Returns(AlertJobsCollection);
                AlertJobsService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AlertJobsService.Setup(x => x.Add(It.IsAny<AlertJobs>())).Returns(ct);
                AlertJobsService.Setup(x => x.Delete(It.IsAny<AlertJobs>())).Verifiable();
                AlertJobsService.Setup(x => x.Update(It.IsAny<AlertJobs>(), It.IsAny<object>())).Returns(ct);

                var AlertJobsObject = AlertJobsService.Object;
                var p1 = AlertJobsObject.GetAll();
                var p2 = AlertJobsObject.Get(1);
                var p3 = AlertJobsObject.Update(ct, obj);
                var p4 = AlertJobsObject.Add(ct);
                AlertJobsObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AlertJobs>>(p1);
                Assert.IsAssignableFrom<AlertJobs>(p2);
                Assert.Equal("Test AlertJobs", p2.JobName);
                Assert.Equal("Test AlertJobs", p3.JobName);

                AlertJobsService.VerifyAll();

                AlertJobsObject.Dispose();
            }
            finally
            {
                AlertJobsService = null;
            }
        }
    }
}
