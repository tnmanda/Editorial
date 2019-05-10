using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class WorkUnitTypeTest
    {
        [Fact]
        public void WorkUnitType()
        {
            IQueryable<WorkUnitType> WorkUnitTypeCollection = Enumerable.Empty<WorkUnitType>().AsQueryable();
            WorkUnitType ct = new WorkUnitType { WorkUnitTypeID = 1, WorkUnitTypeName = "Test WUT" };

            Mock<IWorkUnitTypeRepository> WorkUnitTypeService = new Mock<IWorkUnitTypeRepository>();

            object obj = new object();

            try
            {
                WorkUnitTypeService.Setup(x => x.GetAll()).Returns(WorkUnitTypeCollection);
                WorkUnitTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                WorkUnitTypeService.Setup(x => x.Add(It.IsAny<WorkUnitType>())).Returns(ct);
                WorkUnitTypeService.Setup(x => x.Delete(It.IsAny<WorkUnitType>())).Verifiable();
                WorkUnitTypeService.Setup(x => x.Update(It.IsAny<WorkUnitType>(), It.IsAny<object>())).Returns(ct);

                var WorkUnitTypeObject = WorkUnitTypeService.Object;
                var p1 = WorkUnitTypeObject.GetAll();
                var p2 = WorkUnitTypeObject.Get(1);
                var p3 = WorkUnitTypeObject.Update(ct, obj);
                var p4 = WorkUnitTypeObject.Add(ct);
                WorkUnitTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<WorkUnitType>>(p1);
                Assert.IsAssignableFrom<WorkUnitType>(p2);
                Assert.Equal("Test WUT", p2.WorkUnitTypeName);
                Assert.Equal("Test WUT", p3.WorkUnitTypeName);

                WorkUnitTypeService.VerifyAll();

                WorkUnitTypeObject.Dispose();
            }
            finally
            {
                WorkUnitTypeService = null;
            }
        }
    }
}
