using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using CoreOSR.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CoreOSR.Employee
{
    public class EmployeeAppService : CoreOSRAppServiceBase, IEmployeeAppService
    {
        private readonly EmployeeManager _employeeManager;
        //public async Task<String> AddEmployee()
        //{
        //    return "Success";
        //}
        public async Task<Boolean> AddEmployee(EmployeeInput input)
        {
            var employee = ObjectMapper.Map<Employee>(input);

            await _employeeManager.CreateEmployeeAsync(employee);

            return true;
        }
    }
}
