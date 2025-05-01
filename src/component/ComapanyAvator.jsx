const CompanyAvatar = ({ companyName }) => {
    const firstLetter = companyName.charAt(0).toUpperCase();
    
    // Generate a consistent color based on the company name
    const getColorFromName = (name) => {
      const colors = ['#ff9900', '#e82127', '#3498db', '#9b59b6', '#1abc9c', '#f1c40f'];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index];
    };
  
    return (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
        style={{ backgroundColor: getColorFromName(companyName) }}
      >
        {firstLetter}
      </div>
    );
  };
  

  export default CompanyAvatar;
  // Usage in JobCard:
  // <CompanyAvatar companyName={job.company_name} />
  