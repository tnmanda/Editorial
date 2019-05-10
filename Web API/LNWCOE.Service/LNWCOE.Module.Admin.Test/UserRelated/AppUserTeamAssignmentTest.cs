using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserTeamAssignmentTest
    {
        [Fact]
        public void AppUserTeamAssignment()
        {
            IQueryable<AppUserTeamAssignment> AppUserTeamAssignmentCollection = Enumerable.Empty<AppUserTeamAssignment>().AsQueryable();
            AppUserTeamAssignment ct = new AppUserTeamAssignment { AppUserTeamAssignmentID = 1, CreatedBy = "Test AppUserTeamAssignment" };

            Mock<IAppUserTeamAssignmentRepository> AppUserTeamAssignmentService = new Mock<IAppUserTeamAssignmentRepository>();

            object obj = new object();

            try
            {
                AppUserTeamAssignmentService.Setup(x => x.GetAll()).Returns(AppUserTeamAssignmentCollection);
                AppUserTeamAssignmentService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserTeamAssignmentService.Setup(x => x.Add(It.IsAny<AppUserTeamAssignment>())).Returns(ct);
                AppUserTeamAssignmentService.Setup(x => x.Delete(It.IsAny<AppUserTeamAssignment>())).Verifiable();
                AppUserTeamAssignmentService.Setup(x => x.Update(It.IsAny<AppUserTeamAssignment>(), It.IsAny<object>())).Returns(ct);

                var AppUserTeamAssignmentObject = AppUserTeamAssignmentService.Object;
                var p1 = AppUserTeamAssignmentObject.GetAll();
                var p2 = AppUserTeamAssignmentObject.Get(1);
                var p3 = AppUserTeamAssignmentObject.Update(ct, obj);
                var p4 = AppUserTeamAssignmentObject.Add(ct);
                AppUserTeamAssignmentObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserTeamAssignment>>(p1);
                Assert.IsAssignableFrom<AppUserTeamAssignment>(p2);
                Assert.Equal("Test AppUserTeamAssignment", p2.CreatedBy);
                Assert.Equal("Test AppUserTeamAssignment", p3.CreatedBy);

                AppUserTeamAssignmentService.VerifyAll();

                AppUserTeamAssignmentObject.Dispose();
            }
            finally
            {
                AppUserTeamAssignmentService = null;
            }
        }
    }
}
