using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserLanguageTest
    {
        [Fact]
        public void AppUserLanguage()
        {
            IQueryable<AppUserLanguage> AppUserLanguageCollection = Enumerable.Empty<AppUserLanguage>().AsQueryable();
            AppUserLanguage ct = new AppUserLanguage { AppUserLanguageID = 1, CreatedBy = "Test AppUserLanguage" };

            Mock<IAppUserLanguageRepository> AppUserLanguageService = new Mock<IAppUserLanguageRepository>();

            object obj = new object();

            try
            {
                AppUserLanguageService.Setup(x => x.GetAll()).Returns(AppUserLanguageCollection);
                AppUserLanguageService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserLanguageService.Setup(x => x.Add(It.IsAny<AppUserLanguage>())).Returns(ct);
                AppUserLanguageService.Setup(x => x.Delete(It.IsAny<AppUserLanguage>())).Verifiable();
                AppUserLanguageService.Setup(x => x.Update(It.IsAny<AppUserLanguage>(), It.IsAny<object>())).Returns(ct);

                var AppUserLanguageObject = AppUserLanguageService.Object;
                var p1 = AppUserLanguageObject.GetAll();
                var p2 = AppUserLanguageObject.Get(1);
                var p3 = AppUserLanguageObject.Update(ct, obj);
                var p4 = AppUserLanguageObject.Add(ct);
                AppUserLanguageObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserLanguage>>(p1);
                Assert.IsAssignableFrom<AppUserLanguage>(p2);
                Assert.Equal("Test AppUserLanguage", p2.CreatedBy);
                Assert.Equal("Test AppUserLanguage", p3.CreatedBy);

                AppUserLanguageService.VerifyAll();

                AppUserLanguageObject.Dispose();
            }
            finally
            {
                AppUserLanguageService = null;
            }
        }
    }
}
