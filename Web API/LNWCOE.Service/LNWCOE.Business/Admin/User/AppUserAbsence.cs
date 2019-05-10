﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserAbsence
    {
        [Key]
        [DataMember]
        public int AppUserAbsenceID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public DateTime? StartDateUTC { get; set; }
        [DataMember]
        public DateTime? EndDateUTC { get; set; }
        [DataMember]
        public int? AbsenceTypeID { get; set; }
        [DataMember]
        public string Notes { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public AbsenceType AbsenceType { get; set; }

    }
}
