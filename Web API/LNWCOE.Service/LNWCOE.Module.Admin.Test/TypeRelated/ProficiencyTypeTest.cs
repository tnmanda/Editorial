using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class ProficiencyTypeTest
    {
        [Fact]
        public void ProficiencyType()
        {
            IQueryable<ProficiencyType> ProficiencyTypeCollection = Enumerable.Empty<ProficiencyType>().AsQueryable();
            ProficiencyType ct = new ProficiencyType { ProficiencyTypeID = 1, ProficiencyTypeName = "Test PT" };

            Mock<IProficiencyTypeRepository> ProficiencyTypeService = new Mock<IProficiencyTypeRepository>();

            object obj = new object();

            try
            {
                ProficiencyTypeService.Setup(x => x.GetAll()).Returns(ProficiencyTypeCollection);
                ProficiencyTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                ProficiencyTypeService.Setup(x => x.Add(It.IsAny<ProficiencyType>())).Returns(ct);
                ProficiencyTypeService.Setup(x => x.Delete(It.IsAny<ProficiencyType>())).Verifiable();
                ProficiencyTypeService.Setup(x => x.Update(It.IsAny<ProficiencyType>(), It.IsAny<object>())).Returns(ct);

                var ProficiencyTypeObject = ProficiencyTypeService.Object;
                var p1 = ProficiencyTypeObject.GetAll();
                var p2 = ProficiencyTypeObject.Get(1);
                var p3 = ProficiencyTypeObject.Update(ct, obj);
                var p4 = ProficiencyTypeObject.Add(ct);
                ProficiencyTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<ProficiencyType>>(p1);
                Assert.IsAssignableFrom<ProficiencyType>(p2);
                Assert.Equal("Test PT", p2.ProficiencyTypeName);
                Assert.Equal("Test PT", p3.ProficiencyTypeName);

                ProficiencyTypeService.VerifyAll();

                ProficiencyTypeObject.Dispose();
            }
            finally
            {
                ProficiencyTypeService = null;
            }
        }
    }
}
