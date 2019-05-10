using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;


namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class RecordLocksTest
    {
        [Fact]
        public void RecordLocks()
        {
            IQueryable<RecordLocks> RecordLocksCollection = Enumerable.Empty<RecordLocks>().AsQueryable();
            RecordLocks ct = new RecordLocks { RecordLockID = 1,  CreatedBy = "Test User 1" };

            Mock<IRecordLocksRepository> RecordLocksService = new Mock<IRecordLocksRepository>();

            object obj = new object();

            try
            {
                RecordLocksService.Setup(x => x.GetAll()).Returns(RecordLocksCollection);
                RecordLocksService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                RecordLocksService.Setup(x => x.Add(It.IsAny<RecordLocks>())).Returns(ct);
                RecordLocksService.Setup(x => x.Delete(It.IsAny<RecordLocks>())).Verifiable();
                RecordLocksService.Setup(x => x.Update(It.IsAny<RecordLocks>(), It.IsAny<object>())).Returns(ct);

                var RecordLocksObject = RecordLocksService.Object;
                var p1 = RecordLocksObject.GetAll();
                var p2 = RecordLocksObject.Get(1);
                var p3 = RecordLocksObject.Update(ct, obj);
                var p4 = RecordLocksObject.Add(ct);
                RecordLocksObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<RecordLocks>>(p1);
                Assert.IsAssignableFrom<RecordLocks>(p2);
                Assert.Equal("Test User 1", p2.CreatedBy);
                Assert.Equal("Test User 1", p3.CreatedBy);

                RecordLocksService.VerifyAll();

                RecordLocksObject.Dispose();
            }
            finally
            {
                RecordLocksService = null;
            }
        }
    }
}
