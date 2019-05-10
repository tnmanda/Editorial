namespace LNWCOE.Models.HR
{
    public class WorkItemPostData
    {
        public string Token { get; set; }
        public string ProfileId { get; set; }
        public int Appuserid { get; set; }
        public int ModuleTableEntryID { get; set; } // This is the ID for specific table 
    }
}
