using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class InvestigationActivityTest
    {
        [Fact]
        public void InvestigationActivity()
        {
            IQueryable<InvestigationActivity> InvestigationActivityInvestigationActivity = Enumerable.Empty<InvestigationActivity>().AsQueryable();
            InvestigationActivity ct = new InvestigationActivity { InvestigationActivityID = 1, CreatedBy = "Test InvestigationActivity" };

            Mock<IInvestigationActivityRepository> InvestigationActivityService = new Mock<IInvestigationActivityRepository>();

            object obj = new object();

            try
            {
                InvestigationActivityService.Setup(x => x.GetAll()).Returns(InvestigationActivityInvestigationActivity);
                InvestigationActivityService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                InvestigationActivityService.Setup(x => x.Add(It.IsAny<InvestigationActivity>())).Returns(ct);
                InvestigationActivityService.Setup(x => x.Delete(It.IsAny<InvestigationActivity>())).Verifiable();
                InvestigationActivityService.Setup(x => x.Update(It.IsAny<InvestigationActivity>(), It.IsAny<object>())).Returns(ct);

                var InvestigationActivityObject = InvestigationActivityService.Object;
                var p1 = InvestigationActivityObject.GetAll();
                var p2 = InvestigationActivityObject.Get(1);
                var p3 = InvestigationActivityObject.Update(ct, obj);
                var p4 = InvestigationActivityObject.Add(ct);
                InvestigationActivityObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<InvestigationActivity>>(p1);
                Assert.IsAssignableFrom<InvestigationActivity>(p2);
                Assert.Equal("Test InvestigationActivity", p2.CreatedBy);
                Assert.Equal("Test InvestigationActivity", p3.CreatedBy);

                InvestigationActivityService.VerifyAll();

                InvestigationActivityObject.Dispose();
            }
            finally
            {
                InvestigationActivityService = null;
            }
        }
    }
}
