include $(TOPDIR)/include/package-build.mk
include $(TOPDIR)/include/host-specific.mk

define package/database
	PKG_NAME := database
	PKG_VERSION := 22.04
	PKG_RELEASE := 0.1
	PKG_NO_BUILD := 1
endef

define package/database/prepare
	true
endef

define package/database/configure
	true
endef

define package/database/compile
	true
endef

define package/database/install
	$(SILENT) $(call CopyFilesDir,$(1))
	$(SILENT) $(call CopyHostDir,$(HOST_SPECIFIC_IP),$(1))
	$(SILENT) $(call CopyVirtualHostDir,$(VIRTUAL_HOST_IP),$(1))
endef

$(eval $(call SourcePackage,database))
