<template>
  <main id="site-wrapper">
    <section class="section">
      <div class="container-fluid">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Room System</a></li>
          <li class="breadcrumb-item active">Manage room systems</li>
        </ol>
        <div class="section-header">
          <div class="section-header-title">
            <a class="section-header-back" href="#"><i class="far fa-arrow-circle-left"></i></a>
            <h1>Manage room systems</h1>
          </div>
        </div>
        <div class="row row-has-panel">
          <div class="col-lg-12">
            <div class="section-panel">
              <div class="section-panel-header">
                <div class="section-panel-header-title">
                  <h3>Your room</h3>
                </div>
                <div class="section-panel-header-action">
                  <a href="#" class="btn btn-link"><img alt="" src="@/assets/img/icons/icon-plus-primary.svg" />Add billing details</a>
                </div>
              </div>
              <div class="section-panel-body">
                <table class="table table-borderless table-data table-hide-last-column">
                  <thead>
                    <tr>
                      <th>Room Name</th>
                      <th>Email Address</th>
                      <th>Room ID</th>
                      <th>Reg. Details</th>
                      <th>Plan &amp; role</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Core team</td>
                      <td>janis@netcore.lv</td>
                      <td><a href="#">core.team</a></td>
                      <td><a href="#" class="btn btn-link"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a></td>
                      <td><a href="#">Edit Plan &amp; Role</a></td>
                      <td class="td-action">
                        <a href="#" class="table-action" data-disabled="true">
                          <i class="far fa-ban"></i>
                          Block
                        </a>
                        <a href="#" class="table-action">
                            <i class="fal fa-times"></i>
                            Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>