using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserFunctionTest
    {
        [Fact]
        public void AppUserFunction()
        {
            IQueryable<AppUserFunction> AppUserFunctionCollection = Enumerable.Empty<AppUserFunction>().AsQueryable();
            AppUserFunction ct = new AppUserFunction { AppUserFunctionID = 1,  CreatedBy = "Test AppUserFunction" };

            Mock<IAppUserFunctionRepository> AppUserFunctionService = new Mock<IAppUserFunctionRepository>();

            object obj = new object();

            try
            {
                AppUserFunctionService.Setup(x => x.GetAll()).Returns(AppUserFunctionCollection);
                AppUserFunctionService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserFunctionService.Setup(x => x.Add(It.IsAny<AppUserFunction>())).Returns(ct);
                AppUserFunctionService.Setup(x => x.Delete(It.IsAny<AppUserFunction>())).Verifiable();
                AppUserFunctionService.Setup(x => x.Update(It.IsAny<AppUserFunction>(), It.IsAny<object>())).Returns(ct);

                var AppUserFunctionObject = AppUserFunctionService.Object;
                var p1 = AppUserFunctionObject.GetAll();
                var p2 = AppUserFunctionObject.Get(1);
                var p3 = AppUserFunctionObject.Update(ct, obj);
                var p4 = AppUserFunctionObject.Add(ct);
                AppUserFunctionObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserFunction>>(p1);
                Assert.IsAssignableFrom<AppUserFunction>(p2);
                Assert.Equal("Test AppUserFunction", p2.CreatedBy);
                Assert.Equal("Test AppUserFunction", p3.CreatedBy);

                AppUserFunctionService.VerifyAll();

                AppUserFunctionObject.Dispose();
            }
            finally
            {
                AppUserFunctionService = null;
            }
        }
    }
}
