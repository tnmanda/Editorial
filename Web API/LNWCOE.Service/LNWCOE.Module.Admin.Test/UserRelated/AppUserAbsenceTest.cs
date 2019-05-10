using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserAbsenceTest
    {
        [Fact]
        public void AppUserAbsence()
        {
            IQueryable<AppUserAbsence> AppUserAbsenceCollection = Enumerable.Empty<AppUserAbsence>().AsQueryable();
            AppUserAbsence ct = new AppUserAbsence { AppUserAbsenceID = 1, Notes = "Test AppUserAbsence" };

            Mock<IAppUserAbsenceRepository> AppUserAbsenceService = new Mock<IAppUserAbsenceRepository>();

            object obj = new object();

            try
            {
                AppUserAbsenceService.Setup(x => x.GetAll()).Returns(AppUserAbsenceCollection);
                AppUserAbsenceService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserAbsenceService.Setup(x => x.Add(It.IsAny<AppUserAbsence>())).Returns(ct);
                AppUserAbsenceService.Setup(x => x.Delete(It.IsAny<AppUserAbsence>())).Verifiable();
                AppUserAbsenceService.Setup(x => x.Update(It.IsAny<AppUserAbsence>(), It.IsAny<object>())).Returns(ct);

                var AppUserAbsenceObject = AppUserAbsenceService.Object;
                var p1 = AppUserAbsenceObject.GetAll();
                var p2 = AppUserAbsenceObject.Get(1);
                var p3 = AppUserAbsenceObject.Update(ct, obj);
                var p4 = AppUserAbsenceObject.Add(ct);
                AppUserAbsenceObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserAbsence>>(p1);
                Assert.IsAssignableFrom<AppUserAbsence>(p2);
                Assert.Equal("Test AppUserAbsence", p2.Notes);
                Assert.Equal("Test AppUserAbsence", p3.Notes);

                AppUserAbsenceService.VerifyAll();

                AppUserAbsenceObject.Dispose();
            }
            finally
            {
                AppUserAbsenceService = null;
            }
        }
    }
}
