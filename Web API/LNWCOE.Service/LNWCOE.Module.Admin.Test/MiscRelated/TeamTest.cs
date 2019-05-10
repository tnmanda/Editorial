using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class TeamTest
    {
        [Fact]
        public void Team()
        {
            IQueryable<Team> TeamCollection = Enumerable.Empty<Team>().AsQueryable();
            Team ct = new Team { TeamID = 1, TeamName = "Test Team" };

            Mock<ITeamRepository> TeamService = new Mock<ITeamRepository>();

            object obj = new object();

            try
            {
                TeamService.Setup(x => x.GetAll()).Returns(TeamCollection);
                TeamService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                TeamService.Setup(x => x.Add(It.IsAny<Team>())).Returns(ct);
                TeamService.Setup(x => x.Delete(It.IsAny<Team>())).Verifiable();
                TeamService.Setup(x => x.Update(It.IsAny<Team>(), It.IsAny<object>())).Returns(ct);
                TeamService.Setup(x => x.GetIdIncluding(It.IsAny<int>())).Returns(ct);
                TeamService.Setup(x => x.GetAllIncludingByName(It.IsAny<string>())).Returns(TeamCollection);


                var TeamObject = TeamService.Object;
                var p1 = TeamObject.GetAll();
                var p2 = TeamObject.Get(1);
                var p3 = TeamObject.Update(ct, obj);
                var p4 = TeamObject.Add(ct);
                var p5 = TeamObject.GetIdIncluding(1);
                var p6 = TeamObject.GetAllIncludingByName("test");

                TeamObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Team>>(p1);
                Assert.IsAssignableFrom<Team>(p2);
                Assert.Equal("Test Team", p2.TeamName);
                Assert.Equal("Test Team", p3.TeamName);
                Assert.Equal("Test Team", p4.TeamName);
                Assert.IsAssignableFrom<Team>(p4);
                Assert.IsAssignableFrom<Team>(p5);
                Assert.Equal("Test Team", p5.TeamName);
                Assert.IsAssignableFrom<IQueryable<Team>>(p6);

                TeamService.VerifyAll();

                TeamObject.Dispose();
            }
            finally
            {
                TeamService = null;
            }
        }
    }
}
