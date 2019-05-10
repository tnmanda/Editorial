using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class InvestigationNoteTest
    {
        [Fact]
        public void InvestigationNote()
        {
            IQueryable<InvestigationNote> InvestigationNoteInvestigationNote = Enumerable.Empty<InvestigationNote>().AsQueryable();
            InvestigationNote ct = new InvestigationNote { InvestigationNoteID = 1, NoteText = "Test InvestigationNote" };

            Mock<IInvestigationNoteRepository> InvestigationNoteService = new Mock<IInvestigationNoteRepository>();

            object obj = new object();

            try
            {
                InvestigationNoteService.Setup(x => x.GetAll()).Returns(InvestigationNoteInvestigationNote);
                InvestigationNoteService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                InvestigationNoteService.Setup(x => x.Add(It.IsAny<InvestigationNote>())).Returns(ct);
                InvestigationNoteService.Setup(x => x.Delete(It.IsAny<InvestigationNote>())).Verifiable();
                InvestigationNoteService.Setup(x => x.Update(It.IsAny<InvestigationNote>(), It.IsAny<object>())).Returns(ct);

                var InvestigationNoteObject = InvestigationNoteService.Object;
                var p1 = InvestigationNoteObject.GetAll();
                var p2 = InvestigationNoteObject.Get(1);
                var p3 = InvestigationNoteObject.Update(ct, obj);
                var p4 = InvestigationNoteObject.Add(ct);
                InvestigationNoteObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<InvestigationNote>>(p1);
                Assert.IsAssignableFrom<InvestigationNote>(p2);
                Assert.Equal("Test InvestigationNote", p2.NoteText);
                Assert.Equal("Test InvestigationNote", p3.NoteText);

                InvestigationNoteService.VerifyAll();

                InvestigationNoteObject.Dispose();
            }
            finally
            {
                InvestigationNoteService = null;
            }
        }
    }
}
