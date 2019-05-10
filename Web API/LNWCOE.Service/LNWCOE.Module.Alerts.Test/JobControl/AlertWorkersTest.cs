using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test.JobControl
{
    public class AlertWorkersTest
    {
        [Fact]
        public void AlertWorkers()
        {
            IQueryable<AlertWorkers> AlertWorkersCollection = Enumerable.Empty<AlertWorkers>().AsQueryable();
            AlertWorkers ct = new AlertWorkers { AlertWorkersID = 1,  CreatedBy = "Test AlertWorkers" };

            Mock<IAlertWorkersRepository> AlertWorkersService = new Mock<IAlertWorkersRepository>();

            object obj = new object();

            try
            {
                AlertWorkersService.Setup(x => x.GetAll()).Returns(AlertWorkersCollection);
                AlertWorkersService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AlertWorkersService.Setup(x => x.Add(It.IsAny<AlertWorkers>())).Returns(ct);
                AlertWorkersService.Setup(x => x.Delete(It.IsAny<AlertWorkers>())).Verifiable();
                AlertWorkersService.Setup(x => x.Update(It.IsAny<AlertWorkers>(), It.IsAny<object>())).Returns(ct);

                var AlertWorkersObject = AlertWorkersService.Object;
                var p1 = AlertWorkersObject.GetAll();
                var p2 = AlertWorkersObject.Get(1);
                var p3 = AlertWorkersObject.Update(ct, obj);
                var p4 = AlertWorkersObject.Add(ct);
                AlertWorkersObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AlertWorkers>>(p1);
                Assert.IsAssignableFrom<AlertWorkers>(p2);
                Assert.Equal("Test AlertWorkers", p2.CreatedBy);
                Assert.Equal("Test AlertWorkers", p3.CreatedBy);

                AlertWorkersService.VerifyAll();

                AlertWorkersObject.Dispose();
            }
            finally
            {
                AlertWorkersService = null;
            }
        }
    }
}
