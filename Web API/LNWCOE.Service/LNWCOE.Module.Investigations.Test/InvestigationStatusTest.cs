using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class InvestigationStatusTest
    {
        [Fact]
        public void InvestigationStatus()
        {
            IQueryable<InvestigationStatus> InvestigationStatusInvestigationStatus = Enumerable.Empty<InvestigationStatus>().AsQueryable();
            InvestigationStatus ct = new InvestigationStatus { InvestigationStatusID = 1, InvestigationStatusName = "Test InvestigationStatus" };

            Mock<IInvestigationStatusRepository> InvestigationStatusService = new Mock<IInvestigationStatusRepository>();

            object obj = new object();

            try
            {
                InvestigationStatusService.Setup(x => x.GetAll()).Returns(InvestigationStatusInvestigationStatus);
                InvestigationStatusService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                InvestigationStatusService.Setup(x => x.Add(It.IsAny<InvestigationStatus>())).Returns(ct);
                InvestigationStatusService.Setup(x => x.Delete(It.IsAny<InvestigationStatus>())).Verifiable();
                InvestigationStatusService.Setup(x => x.Update(It.IsAny<InvestigationStatus>(), It.IsAny<object>())).Returns(ct);

                var InvestigationStatusObject = InvestigationStatusService.Object;
                var p1 = InvestigationStatusObject.GetAll();
                var p2 = InvestigationStatusObject.Get(1);
                var p3 = InvestigationStatusObject.Update(ct, obj);
                var p4 = InvestigationStatusObject.Add(ct);
                InvestigationStatusObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<InvestigationStatus>>(p1);
                Assert.IsAssignableFrom<InvestigationStatus>(p2);
                Assert.Equal("Test InvestigationStatus", p2.InvestigationStatusName);
                Assert.Equal("Test InvestigationStatus", p3.InvestigationStatusName);

                InvestigationStatusService.VerifyAll();

                InvestigationStatusObject.Dispose();
            }
            finally
            {
                InvestigationStatusService = null;
            }
        }
    }
}
