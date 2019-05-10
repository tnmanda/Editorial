using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class InvestigationDispositionsTest
    {
        [Fact]
        public void InvestigationDispositions()
        {
            IQueryable<InvestigationDispositions> InvestigationDispositionsInvestigationDispositions = Enumerable.Empty<InvestigationDispositions>().AsQueryable();
            InvestigationDispositions ct = new InvestigationDispositions { InvestigationDispositionsID = 1, DispositionDescription = "Test InvestigationDispositions" };

            Mock<IInvestigationDispositionsRepository> InvestigationDispositionsService = new Mock<IInvestigationDispositionsRepository>();

            object obj = new object();

            try
            {
                InvestigationDispositionsService.Setup(x => x.GetAll()).Returns(InvestigationDispositionsInvestigationDispositions);
                InvestigationDispositionsService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                InvestigationDispositionsService.Setup(x => x.Add(It.IsAny<InvestigationDispositions>())).Returns(ct);
                InvestigationDispositionsService.Setup(x => x.Delete(It.IsAny<InvestigationDispositions>())).Verifiable();
                InvestigationDispositionsService.Setup(x => x.Update(It.IsAny<InvestigationDispositions>(), It.IsAny<object>())).Returns(ct);

                var InvestigationDispositionsObject = InvestigationDispositionsService.Object;
                var p1 = InvestigationDispositionsObject.GetAll();
                var p2 = InvestigationDispositionsObject.Get(1);
                var p3 = InvestigationDispositionsObject.Update(ct, obj);
                var p4 = InvestigationDispositionsObject.Add(ct);
                InvestigationDispositionsObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<InvestigationDispositions>>(p1);
                Assert.IsAssignableFrom<InvestigationDispositions>(p2);
                Assert.Equal("Test InvestigationDispositions", p2.DispositionDescription);
                Assert.Equal("Test InvestigationDispositions", p3.DispositionDescription);

                InvestigationDispositionsService.VerifyAll();

                InvestigationDispositionsObject.Dispose();
            }
            finally
            {
                InvestigationDispositionsService = null;
            }
        }
    }
}
