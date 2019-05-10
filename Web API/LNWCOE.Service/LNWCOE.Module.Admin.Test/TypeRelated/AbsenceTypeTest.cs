using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class AbsenceTypeTest
    {
        [Fact]
        public void AbsenceType()
        {
            IQueryable<AbsenceType> AbsenceTypeCollection = Enumerable.Empty<AbsenceType>().AsQueryable();
            AbsenceType at = new AbsenceType { AbsenceTypeID = 1, AbsenceTypeName = "Test AT" };

            Mock<IAbsenceTypeRepository> AbsenceTypeService = new Mock<IAbsenceTypeRepository>();

            try
            {
                AbsenceTypeService.Setup(x => x.GetAll()).Returns(AbsenceTypeCollection);
                AbsenceTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(at);
                AbsenceTypeService.Setup(x => x.Add(It.IsAny<AbsenceType>())).Returns(at);

                var AbsenceTypeObject = AbsenceTypeService.Object;
                var p1 = AbsenceTypeObject.GetAll();
                var p2 = AbsenceTypeObject.Get(1);
                var p3 = AbsenceTypeObject.Add(at);

                Assert.IsAssignableFrom<IQueryable<AbsenceType>>(p1);
                Assert.IsAssignableFrom<AbsenceType>(p2);
                Assert.Equal("Test AT", p2.AbsenceTypeName);

                AbsenceTypeService.VerifyAll();

                AbsenceTypeObject.Dispose();
            }
            finally
            {
                AbsenceTypeService = null;
            }
        }
    }
}
