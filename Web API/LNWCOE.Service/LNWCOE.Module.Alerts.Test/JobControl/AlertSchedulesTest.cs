using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test.JobControl
{
    public class AlertSchedulesTest
    {
        [Fact]
        public void AlertSchedules()
        {
            IQueryable<AlertSchedules> AlertSchedulesCollection = Enumerable.Empty<AlertSchedules>().AsQueryable();
            AlertSchedules ct = new AlertSchedules { AlertSchedulesId = 1,  CreatedBy = "Test AlertSchedules" };

            Mock<IAlertSchedulesRepository> AlertSchedulesService = new Mock<IAlertSchedulesRepository>();

            object obj = new object();

            try
            {
                AlertSchedulesService.Setup(x => x.GetAll()).Returns(AlertSchedulesCollection);
                AlertSchedulesService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AlertSchedulesService.Setup(x => x.Add(It.IsAny<AlertSchedules>())).Returns(ct);
                AlertSchedulesService.Setup(x => x.Delete(It.IsAny<AlertSchedules>())).Verifiable();
                AlertSchedulesService.Setup(x => x.Update(It.IsAny<AlertSchedules>(), It.IsAny<object>())).Returns(ct);

                var AlertSchedulesObject = AlertSchedulesService.Object;
                var p1 = AlertSchedulesObject.GetAll();
                var p2 = AlertSchedulesObject.Get(1);
                var p3 = AlertSchedulesObject.Update(ct, obj);
                var p4 = AlertSchedulesObject.Add(ct);
                AlertSchedulesObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AlertSchedules>>(p1);
                Assert.IsAssignableFrom<AlertSchedules>(p2);
                Assert.Equal("Test AlertSchedules", p2.CreatedBy);
                Assert.Equal("Test AlertSchedules", p3.CreatedBy);

                AlertSchedulesService.VerifyAll();

                AlertSchedulesObject.Dispose();
            }
            finally
            {
                AlertSchedulesService = null;
            }
        }
    }
}
