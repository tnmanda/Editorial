using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserResearchTeamTest
    {
        [Fact]
        public void AppUserResearchTeam()
        {
            IQueryable<AppUserResearchTeam> AppUserResearchTeamCollection = Enumerable.Empty<AppUserResearchTeam>().AsQueryable();
            AppUserResearchTeam ct = new AppUserResearchTeam { AppUserResearchTeamID = 1, CreatedBy = "Test AppUserResearchTeam" };

            Mock<IAppUserResearchTeamRepository> AppUserResearchTeamService = new Mock<IAppUserResearchTeamRepository>();

            object obj = new object();

            try
            {
                AppUserResearchTeamService.Setup(x => x.GetAll()).Returns(AppUserResearchTeamCollection);
                AppUserResearchTeamService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserResearchTeamService.Setup(x => x.Add(It.IsAny<AppUserResearchTeam>())).Returns(ct);
                AppUserResearchTeamService.Setup(x => x.Delete(It.IsAny<AppUserResearchTeam>())).Verifiable();
                AppUserResearchTeamService.Setup(x => x.Update(It.IsAny<AppUserResearchTeam>(), It.IsAny<object>())).Returns(ct);

                var AppUserResearchTeamObject = AppUserResearchTeamService.Object;
                var p1 = AppUserResearchTeamObject.GetAll();
                var p2 = AppUserResearchTeamObject.Get(1);
                var p3 = AppUserResearchTeamObject.Update(ct, obj);
                var p4 = AppUserResearchTeamObject.Add(ct);
                AppUserResearchTeamObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserResearchTeam>>(p1);
                Assert.IsAssignableFrom<AppUserResearchTeam>(p2);
                Assert.Equal("Test AppUserResearchTeam", p2.CreatedBy);
                Assert.Equal("Test AppUserResearchTeam", p3.CreatedBy);

                AppUserResearchTeamService.VerifyAll();

                AppUserResearchTeamObject.Dispose();
            }
            finally
            {
                AppUserResearchTeamService = null;
            }
        }
    }
}
