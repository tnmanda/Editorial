using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test.JobControl
{
    public class AlertSourceTypeTest
    {
        [Fact]
        public void AlertSourceType()
        {
            IQueryable<AlertSourceType> AlertSourceTypeCollection = Enumerable.Empty<AlertSourceType>().AsQueryable();
            AlertSourceType ct = new AlertSourceType { AlertSourceTypeID = 1,  AlertTypeDescription = "Test AlertSourceType" };

            Mock<IAlertSourceTypeRepository> AlertSourceTypeService = new Mock<IAlertSourceTypeRepository>();

            object obj = new object();

            try
            {
                AlertSourceTypeService.Setup(x => x.GetAll()).Returns(AlertSourceTypeCollection);
                AlertSourceTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AlertSourceTypeService.Setup(x => x.Add(It.IsAny<AlertSourceType>())).Returns(ct);
                AlertSourceTypeService.Setup(x => x.Delete(It.IsAny<AlertSourceType>())).Verifiable();
                AlertSourceTypeService.Setup(x => x.Update(It.IsAny<AlertSourceType>(), It.IsAny<object>())).Returns(ct);

                var AlertSourceTypeObject = AlertSourceTypeService.Object;
                var p1 = AlertSourceTypeObject.GetAll();
                var p2 = AlertSourceTypeObject.Get(1);
                var p3 = AlertSourceTypeObject.Update(ct, obj);
                var p4 = AlertSourceTypeObject.Add(ct);
                AlertSourceTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AlertSourceType>>(p1);
                Assert.IsAssignableFrom<AlertSourceType>(p2);
                Assert.Equal("Test AlertSourceType", p2.AlertTypeDescription);
                Assert.Equal("Test AlertSourceType", p3.AlertTypeDescription);

                AlertSourceTypeService.VerifyAll();

                AlertSourceTypeObject.Dispose();
            }
            finally
            {
                AlertSourceTypeService = null;
            }
        }
    }
}
