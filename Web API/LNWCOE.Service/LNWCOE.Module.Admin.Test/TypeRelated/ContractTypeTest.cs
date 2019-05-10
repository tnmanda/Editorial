using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class ContractTypeTest
    {
        [Fact]
        public void ContractType()
        {
            IQueryable<ContractType> ContractTypeCollection = Enumerable.Empty<ContractType>().AsQueryable();
            ContractType ct = new ContractType { ContractTypeID = 1, ContractTypeName = "Test CT" };

            Mock<IContractTypeRepository> ContractTypeService = new Mock<IContractTypeRepository>();

            object obj = new object();

            try
            {
                ContractTypeService.Setup(x => x.GetAll()).Returns(ContractTypeCollection);
                ContractTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                ContractTypeService.Setup(x => x.Add(It.IsAny<ContractType>())).Returns(ct);
                ContractTypeService.Setup(x => x.Delete(It.IsAny<ContractType>())).Verifiable();
                ContractTypeService.Setup(x => x.Update(It.IsAny<ContractType>(), It.IsAny<object>())).Returns(ct);

                var ContractTypeObject = ContractTypeService.Object;
                var p1 = ContractTypeObject.GetAll();
                var p2 = ContractTypeObject.Get(1);
                var p3 = ContractTypeObject.Update(ct, obj);
                var p4 = ContractTypeObject.Add(ct);
                ContractTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<ContractType>>(p1);
                Assert.IsAssignableFrom<ContractType>(p2);
                Assert.Equal("Test CT", p2.ContractTypeName);
                Assert.Equal("Test CT", p3.ContractTypeName);

                ContractTypeService.VerifyAll();

                ContractTypeObject.Dispose();
            }
            finally
            {
                ContractTypeService = null;
            }
        }
    }
}
