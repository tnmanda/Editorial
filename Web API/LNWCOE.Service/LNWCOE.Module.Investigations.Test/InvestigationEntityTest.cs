using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class InvestigationEntityTest
    {
        [Fact]
        public void InvestigationEntity()
        {
            IQueryable<InvestigationEntity> InvestigationEntityInvestigationEntity = Enumerable.Empty<InvestigationEntity>().AsQueryable();
            InvestigationEntity ct = new InvestigationEntity { InvestigationEntityID = 1, CreatedBy = "Test InvestigationEntity" };

            Mock<IInvestigationEntityRepository> InvestigationEntityService = new Mock<IInvestigationEntityRepository>();

            object obj = new object();

            try
            {
                InvestigationEntityService.Setup(x => x.GetAll()).Returns(InvestigationEntityInvestigationEntity);
                InvestigationEntityService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                InvestigationEntityService.Setup(x => x.Add(It.IsAny<InvestigationEntity>())).Returns(ct);
                InvestigationEntityService.Setup(x => x.Delete(It.IsAny<InvestigationEntity>())).Verifiable();
                InvestigationEntityService.Setup(x => x.Update(It.IsAny<InvestigationEntity>(), It.IsAny<object>())).Returns(ct);

                var InvestigationEntityObject = InvestigationEntityService.Object;
                var p1 = InvestigationEntityObject.GetAll();
                var p2 = InvestigationEntityObject.Get(1);
                var p3 = InvestigationEntityObject.Update(ct, obj);
                var p4 = InvestigationEntityObject.Add(ct);
                InvestigationEntityObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<InvestigationEntity>>(p1);
                Assert.IsAssignableFrom<InvestigationEntity>(p2);
                Assert.Equal("Test InvestigationEntity", p2.CreatedBy);
                Assert.Equal("Test InvestigationEntity", p3.CreatedBy);

                InvestigationEntityService.VerifyAll();

                InvestigationEntityObject.Dispose();
            }
            finally
            {
                InvestigationEntityService = null;
            }
        }
    }
}
