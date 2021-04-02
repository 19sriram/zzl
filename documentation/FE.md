
# MODULES:
    ## Modules
    1. LayoutWrapper - FC
    2. History - FC
    
    
    
    Internal:
     Axios - included**
     React-Router -  included**
     

# MODULAR SYSTEM

### Description
Plug and play solution to be provided for following modules

1. User Management

    - Create user with super admin access. Create admin access role users and executive roles and so forth

    Chain of command :
      -> Super Admin  | - Licensing partner (Ghost role** Note: ghost role is created as default and to be stored when application is loaded. )
       -> Admin
        -> Executive


2. Lead Management Fields

            Lead Image: Mr/ Mrs.
            Lead Information:
            Lead owners > Drop Down List (Employee List)
            Frist Name
            Designation
            Mobile Number
            1. +91 XXXXXXXXXXX
            2. +91 XXXXXXXXXXX
            Lead Source: > Drop Down List Industry
            Address Information:
            Address 1 City Country
            Note:
            The above all filed need to keep it as mandatory.
            filed
            Company Name
            Last Name Email ID Website
            Lead Status: > Drop Down List
            Address2 State
            ZIP Code


# SCENARIO
Scenarios listed to find corner cases to build before coding solution


1. If user is on temporary leave, user should be in offline and no leads should be assigned to him - to be deactivated
2.  Restrict number of admins to be created in a given customer LMS

3. karthi resigning this month, arun gets the lead - Assign all leads to Arun (Bulk lead transfer)

4. If leads were transferred from person A to person B, person B should filter and find out what are leads from person A

# INSTALLATION

## FrontEnd Installations

npx create-react-app my-app 

npm install antd

npm install --save-dev webpack webpack-cli webpack-dev-server

npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react

npm install --save-dev css-loader style-loader postcss-loader postcss --save-dev

npm install --save-dev file-loader url-loader

npm install --save-dev autoprefixer

npm install --save-dev html-webpack-plugin

## Installations

webpack with dev-server

react 

antd

--------------------------------------------------------------------------------------------------------------

 ## User Management & Role Management
  1. ~~Create user~~
  2. ~~Create role~~
  3. ~~Create tree view for roles~~
  4. ~~Route created for user, role and tree view~~




# Backend
 ## User Management
   1. Create default role presets as below
    1.1 Ghost role (Licensing Role)
    1.2 CEO
    1.3 Manager
    1.4 Admin
    1.5 Executive

Licensing / Ghost role will be available always in the db for debug purposes and won't be modified. 

2. Role Rulesets / permissions

Licensing / Ghost role - All permission
CEO                    - All permission
Manager                - Restricted permission level 1
Admin                  - Restricted permission level 2
Executive              - Restricted permission level 3

3. Custom Roles - CEO / Ghost Role can create custom roles as per requirement and screen will have restriction levels mentioned for selection


# ARCHITECTURE

1. Default roles - Licensingpartner(Lpartner), CEO, Admin, Executive, Manager

2. LicensingPartner not to show in system - So filter from backend itself.

3. Front End will show only Admin, CEO, Manager  when selected from "reporting to" dropdown and won't show "Executive". FrontEnd will filter the Executive role