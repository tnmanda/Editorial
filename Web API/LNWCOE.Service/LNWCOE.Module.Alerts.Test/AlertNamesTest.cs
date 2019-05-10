using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test
{
    public class AlertNamesTest
    {
        [Fact]
        public void AlertNames()
        {
            IQueryable<AlertNames> AlertNamesCollection = Enumerable.Empty<AlertNames>().AsQueryable();
            AlertNames ct = new AlertNames { AlertNameID = 1, NameEntry = "Test AlertNames" };

            Mock<IAlertNamesRepository> AlertNamesService = new Mock<IAlertNamesRepository>();

            object obj = new object();

            try
            {
                AlertNamesService.Setup(x => x.GetAll()).Returns(AlertNamesCollection);
                AlertNamesService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                
                var AlertNamesObject = AlertNamesService.Object;
                var p1 = AlertNamesObject.GetAll();
                var p2 = AlertNamesObject.Get(1);

                Assert.IsAssignableFrom<IQueryable<AlertNames>>(p1);
                Assert.IsAssignableFrom<AlertNames>(p2);
                Assert.Equal("Test AlertNames", p2.NameEntry);

                AlertNamesService.VerifyAll();

                AlertNamesObject.Dispose();
            }
            finally
            {
                AlertNamesService = null;
            }
        }
    }
}
