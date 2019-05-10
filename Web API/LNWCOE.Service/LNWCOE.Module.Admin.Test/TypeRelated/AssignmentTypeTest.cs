using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class AssignmentTypeTest
    {
        [Fact]
        public void AssignmentType()
        {
            IQueryable<AssignmentType> AssignmentTypeCollection = Enumerable.Empty<AssignmentType>().AsQueryable();
            AssignmentType at = new AssignmentType { AssignmentTypeID = 1, AssignmentTypeName = "Test AT" };

            Mock<IAssignmentTypeRepository> AssignmentTypeService = new Mock<IAssignmentTypeRepository>();

            object obj = new object();

            try
            {
                AssignmentTypeService.Setup(x => x.GetAll()).Returns(AssignmentTypeCollection);
                AssignmentTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(at);
                AssignmentTypeService.Setup(x => x.Add(It.IsAny<AssignmentType>())).Returns(at);
                AssignmentTypeService.Setup(x => x.Delete(It.IsAny<AssignmentType>())).Verifiable();
                AssignmentTypeService.Setup(x => x.Update(It.IsAny<AssignmentType>(), It.IsAny<object>())).Returns(at);


                var AssignmentTypeObject = AssignmentTypeService.Object;
                var p1 = AssignmentTypeObject.GetAll();
                var p2 = AssignmentTypeObject.Get(1);
                var p3 = AssignmentTypeObject.Update(at, obj);
                var p4 = AssignmentTypeObject.Add(at);
                AssignmentTypeObject.Delete(at);

                Assert.IsAssignableFrom<IQueryable<AssignmentType>>(p1);
                Assert.IsAssignableFrom<AssignmentType>(p2);
                Assert.Equal("Test AT", p2.AssignmentTypeName);
                Assert.Equal("Test AT", p3.AssignmentTypeName);

                AssignmentTypeService.VerifyAll();

                AssignmentTypeObject.Dispose();
            }
            finally
            {
                AssignmentTypeService = null;
            }
        }
    }
}
