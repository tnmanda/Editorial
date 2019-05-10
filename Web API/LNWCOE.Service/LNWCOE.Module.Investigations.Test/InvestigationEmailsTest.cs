using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class InvestigationEmailsTest
    {
        [Fact]
        public void InvestigationEmails()
        {
            IQueryable<InvestigationEmails> InvestigationEmailsInvestigationEmails = Enumerable.Empty<InvestigationEmails>().AsQueryable();
            InvestigationEmails ct = new InvestigationEmails {  InvestigationEmailID = 1, EmailBody = "Test InvestigationEmails" };

            Mock<IInvestigationEmailsRepository> InvestigationEmailsService = new Mock<IInvestigationEmailsRepository>();

            object obj = new object();

            try
            {
                InvestigationEmailsService.Setup(x => x.GetAll()).Returns(InvestigationEmailsInvestigationEmails);
                InvestigationEmailsService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                InvestigationEmailsService.Setup(x => x.Add(It.IsAny<InvestigationEmails>())).Returns(ct);
                InvestigationEmailsService.Setup(x => x.Delete(It.IsAny<InvestigationEmails>())).Verifiable();
                InvestigationEmailsService.Setup(x => x.Update(It.IsAny<InvestigationEmails>(), It.IsAny<object>())).Returns(ct);

                var InvestigationEmailsObject = InvestigationEmailsService.Object;
                var p1 = InvestigationEmailsObject.GetAll();
                var p2 = InvestigationEmailsObject.Get(1);
                var p3 = InvestigationEmailsObject.Update(ct, obj);
                var p4 = InvestigationEmailsObject.Add(ct);
                InvestigationEmailsObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<InvestigationEmails>>(p1);
                Assert.IsAssignableFrom<InvestigationEmails>(p2);
                Assert.Equal("Test InvestigationEmails", p2.EmailBody);
                Assert.Equal("Test InvestigationEmails", p3.EmailBody);

                InvestigationEmailsService.VerifyAll();

                InvestigationEmailsObject.Dispose();
            }
            finally
            {
                InvestigationEmailsService = null;
            }
        }
    }
}
