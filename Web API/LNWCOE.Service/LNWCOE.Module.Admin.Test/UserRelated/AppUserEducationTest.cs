using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserEducationTest
    {
        [Fact]
        public void AppUserEducation()
        {
            IQueryable<AppUserEducation> AppUserEducationCollection = Enumerable.Empty<AppUserEducation>().AsQueryable();
            AppUserEducation ct = new AppUserEducation { AppUserEducationID = 1, CreatedBy = "Test AppUserEducation" };

            Mock<IAppUserEducationRepository> AppUserEducationService = new Mock<IAppUserEducationRepository>();

            object obj = new object();

            try
            {
                AppUserEducationService.Setup(x => x.GetAll()).Returns(AppUserEducationCollection);
                AppUserEducationService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserEducationService.Setup(x => x.Add(It.IsAny<AppUserEducation>())).Returns(ct);
                AppUserEducationService.Setup(x => x.Delete(It.IsAny<AppUserEducation>())).Verifiable();
                AppUserEducationService.Setup(x => x.Update(It.IsAny<AppUserEducation>(), It.IsAny<object>())).Returns(ct);

                var AppUserEducationObject = AppUserEducationService.Object;
                var p1 = AppUserEducationObject.GetAll();
                var p2 = AppUserEducationObject.Get(1);
                var p3 = AppUserEducationObject.Update(ct, obj);
                var p4 = AppUserEducationObject.Add(ct);
                AppUserEducationObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserEducation>>(p1);
                Assert.IsAssignableFrom<AppUserEducation>(p2);
                Assert.Equal("Test AppUserEducation", p2.CreatedBy);
                Assert.Equal("Test AppUserEducation", p3.CreatedBy);

                AppUserEducationService.VerifyAll();

                AppUserEducationObject.Dispose();
            }
            finally
            {
                AppUserEducationService = null;
            }
        }
    }
}
