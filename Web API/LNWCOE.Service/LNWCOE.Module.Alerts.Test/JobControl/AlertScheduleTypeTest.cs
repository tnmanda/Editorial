using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test.JobControl
{
    public class AlertScheduleTypeTest
    {
        [Fact]
        public void AlertScheduleType()
        {
            IQueryable<AlertScheduleType> AlertScheduleTypeCollection = Enumerable.Empty<AlertScheduleType>().AsQueryable();
            AlertScheduleType ct = new AlertScheduleType { AlertScheduleTypeID = 1,  AlertScheduleTypeName = "Test AlertScheduleType" };

            Mock<IAlertScheduleTypeRepository> AlertScheduleTypeService = new Mock<IAlertScheduleTypeRepository>();

            object obj = new object();

            try
            {
                AlertScheduleTypeService.Setup(x => x.GetAll()).Returns(AlertScheduleTypeCollection);
                AlertScheduleTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AlertScheduleTypeService.Setup(x => x.Add(It.IsAny<AlertScheduleType>())).Returns(ct);
                AlertScheduleTypeService.Setup(x => x.Delete(It.IsAny<AlertScheduleType>())).Verifiable();
                AlertScheduleTypeService.Setup(x => x.Update(It.IsAny<AlertScheduleType>(), It.IsAny<object>())).Returns(ct);

                var AlertScheduleTypeObject = AlertScheduleTypeService.Object;
                var p1 = AlertScheduleTypeObject.GetAll();
                var p2 = AlertScheduleTypeObject.Get(1);
                var p3 = AlertScheduleTypeObject.Update(ct, obj);
                var p4 = AlertScheduleTypeObject.Add(ct);
                AlertScheduleTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AlertScheduleType>>(p1);
                Assert.IsAssignableFrom<AlertScheduleType>(p2);
                Assert.Equal("Test AlertScheduleType", p2.AlertScheduleTypeName);
                Assert.Equal("Test AlertScheduleType", p3.AlertScheduleTypeName);

                AlertScheduleTypeService.VerifyAll();

                AlertScheduleTypeObject.Dispose();
            }
            finally
            {
                AlertScheduleTypeService = null;
            }
        }
    }
}
