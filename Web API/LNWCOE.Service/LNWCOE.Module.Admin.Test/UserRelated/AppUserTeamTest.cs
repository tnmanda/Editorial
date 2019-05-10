using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserTeamTest
    {
        [Fact]
        public void AppUserTeam()
        {
            IQueryable<AppUserTeam> AppUserTeamCollection = Enumerable.Empty<AppUserTeam>().AsQueryable();
            AppUserTeam ct = new AppUserTeam { AppUserTeamID = 1, Comments = "Test AppUserTeam" };

            Mock<IAppUserTeamRepository> AppUserTeamService = new Mock<IAppUserTeamRepository>();

            object obj = new object();

            try
            {
                AppUserTeamService.Setup(x => x.GetAll()).Returns(AppUserTeamCollection);
                AppUserTeamService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserTeamService.Setup(x => x.Add(It.IsAny<AppUserTeam>())).Returns(ct);
                AppUserTeamService.Setup(x => x.Delete(It.IsAny<AppUserTeam>())).Verifiable();
                AppUserTeamService.Setup(x => x.Update(It.IsAny<AppUserTeam>(), It.IsAny<object>())).Returns(ct);

                var AppUserTeamObject = AppUserTeamService.Object;
                var p1 = AppUserTeamObject.GetAll();
                var p2 = AppUserTeamObject.Get(1);
                var p3 = AppUserTeamObject.Update(ct, obj);
                var p4 = AppUserTeamObject.Add(ct);
                AppUserTeamObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserTeam>>(p1);
                Assert.IsAssignableFrom<AppUserTeam>(p2);
                Assert.Equal("Test AppUserTeam", p2.Comments);
                Assert.Equal("Test AppUserTeam", p3.Comments);

                AppUserTeamService.VerifyAll();

                AppUserTeamObject.Dispose();
            }
            finally
            {
                AppUserTeamService = null;
            }
        }
    }
}
