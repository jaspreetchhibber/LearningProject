using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using CoreOSR.Employees.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreOSR.Employees
{
    [AbpAuthorize]
    public class EmployeeAppService : CoreOSRAppServiceBase, IEmployeeAppService
    {
        private readonly IEmployeeManager _employeeManager;
        public EmployeeAppService(IEmployeeManager employeeManager)
        {
            _employeeManager = employeeManager;
        }
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
        public async Task<List<EmployeeListDto>> GetEmployees()
        {
            var employees = await _employeeManager.GetEmployees();
            if (employees.Count() > 0)
            {
                var employeeListDtos = ObjectMapper.Map<List<EmployeeListDto>>(employees);
                return employeeListDtos;
            }
            return null;
        }
    }
}
