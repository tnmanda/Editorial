using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Alerts.Test.JobControl
{
    public class EncodingTest
    {
        [Fact]
        public void Encoding()
        {
            IQueryable<Encoding> EncodingCollection = Enumerable.Empty<Encoding>().AsQueryable();
            Encoding ct = new Encoding { EncodingID = 1,  EncodingName = "Test Encoding" };

            Mock<IEncodingRepository> EncodingService = new Mock<IEncodingRepository>();

            object obj = new object();

            try
            {
                EncodingService.Setup(x => x.GetAll()).Returns(EncodingCollection);
                EncodingService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                EncodingService.Setup(x => x.Add(It.IsAny<Encoding>())).Returns(ct);
                EncodingService.Setup(x => x.Delete(It.IsAny<Encoding>())).Verifiable();
                EncodingService.Setup(x => x.Update(It.IsAny<Encoding>(), It.IsAny<object>())).Returns(ct);

                var EncodingObject = EncodingService.Object;
                var p1 = EncodingObject.GetAll();
                var p2 = EncodingObject.Get(1);
                var p3 = EncodingObject.Update(ct, obj);
                var p4 = EncodingObject.Add(ct);
                EncodingObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Encoding>>(p1);
                Assert.IsAssignableFrom<Encoding>(p2);
                Assert.Equal("Test Encoding", p2.EncodingName);
                Assert.Equal("Test Encoding", p3.EncodingName);

                EncodingService.VerifyAll();

                EncodingObject.Dispose();
            }
            finally
            {
                EncodingService = null;
            }
        }
    }
}
