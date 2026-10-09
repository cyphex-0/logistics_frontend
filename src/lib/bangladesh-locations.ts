export interface Division {
  name: string;
  districts: string[];
}

export const BANGLADESH_LOCATIONS: Division[] = [
  {
    name: "Dhaka",
    districts: [
      "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", 
      "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", 
      "Rajbari", "Shariatpur", "Tangail"
    ]
  },
  {
    name: "Chattogram",
    districts: [
      "Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Comilla", 
      "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"
    ]
  },
  {
    name: "Rajshahi",
    districts: [
      "Bogura", "Chapainawabganj", "Joypurhat", "Naogaon", 
      "Natore", "Pabna", "Rajshahi", "Sirajganj"
    ]
  },
  {
    name: "Khulna",
    districts: [
      "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", 
      "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
    ]
  },
  {
    name: "Barishal",
    districts: [
      "Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"
    ]
  },
  {
    name: "Sylhet",
    districts: [
      "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"
    ]
  },
  {
    name: "Rangpur",
    districts: [
      "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", 
      "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"
    ]
  },
  {
    name: "Mymensingh",
    districts: [
      "Jamalpur", "Mymensingh", "Netrokona", "Sherpur"
    ]
  }
];
