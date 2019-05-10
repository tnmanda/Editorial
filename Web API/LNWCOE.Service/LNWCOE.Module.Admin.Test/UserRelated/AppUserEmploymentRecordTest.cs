using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserEmploymentRecordTest
    {
        [Fact]
        public void AppUserEmploymentRecord()
        {
            IQueryable<AppUserEmploymentRecord> AppUserEmploymentRecordCollection = Enumerable.Empty<AppUserEmploymentRecord>().AsQueryable();
            AppUserEmploymentRecord ct = new AppUserEmploymentRecord { AppUserEmploymentRecordID = 1, CreatedBy = "Test AppUserEmploymentRecord" };

            Mock<IAppUserEmploymentRecordRepository> AppUserEmploymentRecordService = new Mock<IAppUserEmploymentRecordRepository>();

            object obj = new object();

            try
            {
                AppUserEmploymentRecordService.Setup(x => x.GetAll()).Returns(AppUserEmploymentRecordCollection);
                AppUserEmploymentRecordService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserEmploymentRecordService.Setup(x => x.Add(It.IsAny<AppUserEmploymentRecord>())).Returns(ct);
                AppUserEmploymentRecordService.Setup(x => x.Delete(It.IsAny<AppUserEmploymentRecord>())).Verifiable();
                AppUserEmploymentRecordService.Setup(x => x.Update(It.IsAny<AppUserEmploymentRecord>(), It.IsAny<object>())).Returns(ct);

                var AppUserEmploymentRecordObject = AppUserEmploymentRecordService.Object;
                var p1 = AppUserEmploymentRecordObject.GetAll();
                var p2 = AppUserEmploymentRecordObject.Get(1);
                var p3 = AppUserEmploymentRecordObject.Update(ct, obj);
                var p4 = AppUserEmploymentRecordObject.Add(ct);
                AppUserEmploymentRecordObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserEmploymentRecord>>(p1);
                Assert.IsAssignableFrom<AppUserEmploymentRecord>(p2);
                Assert.Equal("Test AppUserEmploymentRecord", p2.CreatedBy);
                Assert.Equal("Test AppUserEmploymentRecord", p3.CreatedBy);

                AppUserEmploymentRecordService.VerifyAll();

                AppUserEmploymentRecordObject.Dispose();
            }
            finally
            {
                AppUserEmploymentRecordService = null;
            }
        }
    }
}
