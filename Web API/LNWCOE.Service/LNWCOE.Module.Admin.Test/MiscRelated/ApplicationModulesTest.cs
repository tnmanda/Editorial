using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class ApplicationModulesTest
    {
        [Fact]
        public void ApplicationModules()
        {
            IQueryable<ApplicationModules> ApplicationModulesCollection = Enumerable.Empty<ApplicationModules>().AsQueryable();
            ApplicationModules ct = new ApplicationModules { ApplicationModulesID = 1, ModuleName = "Test MN" };

            Mock<IApplicationModulesRepository> ApplicationModulesService = new Mock<IApplicationModulesRepository>();

            object obj = new object();

            try
            {
                ApplicationModulesService.Setup(x => x.GetAll()).Returns(ApplicationModulesCollection);
                ApplicationModulesService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                ApplicationModulesService.Setup(x => x.Add(It.IsAny<ApplicationModules>())).Returns(ct);
                ApplicationModulesService.Setup(x => x.Delete(It.IsAny<ApplicationModules>())).Verifiable();
                ApplicationModulesService.Setup(x => x.Update(It.IsAny<ApplicationModules>(), It.IsAny<object>())).Returns(ct);

                var ApplicationModulesObject = ApplicationModulesService.Object;
                var p1 = ApplicationModulesObject.GetAll();
                var p2 = ApplicationModulesObject.Get(1);
                var p3 = ApplicationModulesObject.Update(ct, obj);
                var p4 = ApplicationModulesObject.Add(ct);
                ApplicationModulesObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<ApplicationModules>>(p1);
                Assert.IsAssignableFrom<ApplicationModules>(p2);
                Assert.Equal("Test MN", p2.ModuleName);
                Assert.Equal("Test MN", p3.ModuleName);

                ApplicationModulesService.VerifyAll();

                ApplicationModulesObject.Dispose();
            }
            finally
            {
                ApplicationModulesService = null;
            }
        }
    }
}
