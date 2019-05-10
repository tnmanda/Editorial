using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class WorkUnitLockDurationInMinTest
    {
        [Fact]
        public void WorkUnitLockDurationInMin()
        {
            IQueryable<WorkUnitLockDurationInMin> WorkUnitLockDurationInMinCollection = Enumerable.Empty<WorkUnitLockDurationInMin>().AsQueryable();
            WorkUnitLockDurationInMin ct = new WorkUnitLockDurationInMin { WorkLockDurationInMinID = 1, CreatedBy = "Test WorkUnitLockDurationInMin" };

            Mock<IWorkUnitLockDurationInMinRepository> WorkUnitLockDurationInMinService = new Mock<IWorkUnitLockDurationInMinRepository>();

            object obj = new object();

            try
            {
                WorkUnitLockDurationInMinService.Setup(x => x.GetAll()).Returns(WorkUnitLockDurationInMinCollection);
                WorkUnitLockDurationInMinService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                WorkUnitLockDurationInMinService.Setup(x => x.Add(It.IsAny<WorkUnitLockDurationInMin>())).Returns(ct);
                WorkUnitLockDurationInMinService.Setup(x => x.Delete(It.IsAny<WorkUnitLockDurationInMin>())).Verifiable();
                WorkUnitLockDurationInMinService.Setup(x => x.Update(It.IsAny<WorkUnitLockDurationInMin>(), It.IsAny<object>())).Returns(ct);
                WorkUnitLockDurationInMinService.Setup(x => x.GetIdIncluding(It.IsAny<int>())).Returns(ct);
                WorkUnitLockDurationInMinService.Setup(x => x.GetAllIncludingByName(It.IsAny<string>())).Returns(WorkUnitLockDurationInMinCollection);


                var WorkUnitLockDurationInMinObject = WorkUnitLockDurationInMinService.Object;
                var p1 = WorkUnitLockDurationInMinObject.GetAll();
                var p2 = WorkUnitLockDurationInMinObject.Get(1);
                var p3 = WorkUnitLockDurationInMinObject.Update(ct, obj);
                var p4 = WorkUnitLockDurationInMinObject.Add(ct);
                var p5 = WorkUnitLockDurationInMinObject.GetIdIncluding(1);
                var p6 = WorkUnitLockDurationInMinObject.GetAllIncludingByName("test");

                WorkUnitLockDurationInMinObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<WorkUnitLockDurationInMin>>(p1);
                Assert.IsAssignableFrom<WorkUnitLockDurationInMin>(p2);
                Assert.Equal("Test WorkUnitLockDurationInMin", p2.CreatedBy);
                Assert.Equal("Test WorkUnitLockDurationInMin", p3.CreatedBy);
                Assert.Equal("Test WorkUnitLockDurationInMin", p4.CreatedBy);
                Assert.IsAssignableFrom<WorkUnitLockDurationInMin>(p4);
                Assert.IsAssignableFrom<WorkUnitLockDurationInMin>(p5);
                Assert.Equal("Test WorkUnitLockDurationInMin", p5.CreatedBy);
                Assert.IsAssignableFrom<IQueryable<WorkUnitLockDurationInMin>>(p6);

                WorkUnitLockDurationInMinService.VerifyAll();

                WorkUnitLockDurationInMinObject.Dispose();
            }
            finally
            {
                WorkUnitLockDurationInMinService = null;
            }
        }
    }
}
