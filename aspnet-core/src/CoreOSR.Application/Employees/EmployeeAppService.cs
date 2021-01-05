using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using CoreOSR.Authorization;
using CoreOSR.Employees.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreOSR.Employees
{
    //[AbpAuthorize]
    [AbpAuthorize(AppPermissions.Pages_Datagrid)]
    public class EmployeeAppService : CoreOSRAppServiceBase, IEmployeeAppService
    {
        private readonly IEmployeeManager _employeeManager;
        public EmployeeAppService(IEmployeeManager employeeManager)
        {
            _employeeManager = employeeManager;
        }
        public async Task<long> AddEmployee(EmployeeInput input)
        {
            var employee = ObjectMapper.Map<Employee>(input);

            return await _employeeManager.CreateEmployeeAsync(employee);
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
        public async Task<long> UpdateEmployee(EmployeeInput input)
        {
            var employee = ObjectMapper.Map<Employee>(input);

            return await _employeeManager.UpdateEmployeeAsync(employee);
        }
        public async Task<Boolean> DeleteEmployee(int employeeId)
        {
            return await _employeeManager.DeleteEmployeeAsync(employeeId);
        }
    }
}
