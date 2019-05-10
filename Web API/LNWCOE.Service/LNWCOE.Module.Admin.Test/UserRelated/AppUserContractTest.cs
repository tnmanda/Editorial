using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserContractTest
    {
        [Fact]
        public void AppUserContract()
        {
            IQueryable<AppUserContract> AppUserContractCollection = Enumerable.Empty<AppUserContract>().AsQueryable();
            AppUserContract ct = new AppUserContract { AppUserContractID = 1, CreatedBy = "Test AppUserContract" };

            Mock<IAppUserContractRepository> AppUserContractService = new Mock<IAppUserContractRepository>();

            object obj = new object();

            try
            {
                AppUserContractService.Setup(x => x.GetAll()).Returns(AppUserContractCollection);
                AppUserContractService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserContractService.Setup(x => x.Add(It.IsAny<AppUserContract>())).Returns(ct);
                AppUserContractService.Setup(x => x.Delete(It.IsAny<AppUserContract>())).Verifiable();
                AppUserContractService.Setup(x => x.Update(It.IsAny<AppUserContract>(), It.IsAny<object>())).Returns(ct);

                var AppUserContractObject = AppUserContractService.Object;
                var p1 = AppUserContractObject.GetAll();
                var p2 = AppUserContractObject.Get(1);
                var p3 = AppUserContractObject.Update(ct, obj);
                var p4 = AppUserContractObject.Add(ct);
                AppUserContractObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserContract>>(p1);
                Assert.IsAssignableFrom<AppUserContract>(p2);
                Assert.Equal("Test AppUserContract", p2.CreatedBy);
                Assert.Equal("Test AppUserContract", p3.CreatedBy);

                AppUserContractService.VerifyAll();

                AppUserContractObject.Dispose();
            }
            finally
            {
                AppUserContractService = null;
            }
        }
    }
}
