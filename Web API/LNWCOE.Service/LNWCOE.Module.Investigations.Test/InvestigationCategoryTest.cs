using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class InvestigationCategoryTest
    {
        [Fact]
        public void InvestigationCategory()
        {
            IQueryable<InvestigationCategory> InvestigationCategoryInvestigationCategory = Enumerable.Empty<InvestigationCategory>().AsQueryable();
            InvestigationCategory ct = new InvestigationCategory { InvestigationCategoryID = 1, CreatedBy = "Test InvestigationCategory" };

            Mock<IInvestigationCategoryRepository> InvestigationCategoryService = new Mock<IInvestigationCategoryRepository>();

            object obj = new object();

            try
            {
                InvestigationCategoryService.Setup(x => x.GetAll()).Returns(InvestigationCategoryInvestigationCategory);
                InvestigationCategoryService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                InvestigationCategoryService.Setup(x => x.Add(It.IsAny<InvestigationCategory>())).Returns(ct);
                InvestigationCategoryService.Setup(x => x.Delete(It.IsAny<InvestigationCategory>())).Verifiable();
                InvestigationCategoryService.Setup(x => x.Update(It.IsAny<InvestigationCategory>(), It.IsAny<object>())).Returns(ct);

                var InvestigationCategoryObject = InvestigationCategoryService.Object;
                var p1 = InvestigationCategoryObject.GetAll();
                var p2 = InvestigationCategoryObject.Get(1);
                var p3 = InvestigationCategoryObject.Update(ct, obj);
                var p4 = InvestigationCategoryObject.Add(ct);
                InvestigationCategoryObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<InvestigationCategory>>(p1);
                Assert.IsAssignableFrom<InvestigationCategory>(p2);
                Assert.Equal("Test InvestigationCategory", p2.CreatedBy);
                Assert.Equal("Test InvestigationCategory", p3.CreatedBy);

                InvestigationCategoryService.VerifyAll();

                InvestigationCategoryObject.Dispose();
            }
            finally
            {
                InvestigationCategoryService = null;
            }
        }
    }
}
