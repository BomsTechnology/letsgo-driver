import axiosClient, { API_BASE_URL } from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BusinessInformation,
  Driver,
  DriverAvaibility,
  DriverExperience,
  DriverPricing,
  DriverSkill,
  HumanIdentity,
  Profile,
  WorkZone,
} from "@mytypes/TimeTableProps";
import { AxiosResponse } from "axios";
import { PREFIX_URL as AUTH_PREFIX_URL } from "@services/useAuth";


const PREFIX_URL_WITHOUT_SLASH = "DRIVER-SERVICE/api/v0/drivers";
const PREFIX_URL = PREFIX_URL_WITHOUT_SLASH + "/";


export const apiCallWrapper = async <T>(response: AxiosResponse<T>) => {
  return new Promise<T>(async (resolve, reject) => {
    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const getDriverInfo = createAsyncThunk<Driver, undefined>(
  "driver/getDriverInfo",
  async () => {
    try {
      const response = await axiosClient.get<Driver>(PREFIX_URL_WITHOUT_SLASH);

      if (response.data != undefined) {
		AsyncStorage.setItem("driver", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const upgradeToDriver = createAsyncThunk<Driver, undefined>(
  "driver/upgradeToDriver",
  async () => {
    try {

		console.log("create driver ");

      const response = await axiosClient.post<Driver>(PREFIX_URL_WITHOUT_SLASH);

      if (response.status < 400 && response.data != undefined) {
		AsyncStorage.setItem("driver", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const updateDriverBusiness = async (data: BusinessInformation) => {
  return new Promise<Driver>(async (resolve, reject) => {
    const response = await axiosClient.put<Driver>(PREFIX_URL_WITHOUT_SLASH, data);

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const updateDriverProfile= async (data: Profile) => {
	return new Promise<Driver>(async (resolve, reject) => {
	  const response = await axiosClient.put<Driver>(PREFIX_URL + "profile", data);
  
	  if (response.data != undefined) {
		return resolve(response.data);
	  } else {
		return reject(new Error("Une erreur réseau s'est produite"));
	  }
	});
  };

export const changeDriverWorkzone = async (data: WorkZone) => {
  return new Promise<WorkZone>(async (resolve, reject) => {
    const response = await axiosClient.put<WorkZone>(
      PREFIX_URL + "work-zone",
      data
    );

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const changeDriverAvailabality = async (data: DriverAvaibility) => {
  return new Promise<DriverAvaibility>(async (resolve, reject) => {
    const response = await axiosClient.put<DriverAvaibility>(
      PREFIX_URL + "availability",
      data
    );

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const changeDriverPricing = async (data: DriverPricing) => {
  return new Promise<DriverPricing>(async (resolve, reject) => {
    const response = await axiosClient.put<DriverPricing>(
      PREFIX_URL + "pricing",
      data
    );

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};



export const removeDriverSkill = createAsyncThunk<
  DriverSkill[],
  string
>("driver/removeDriverSkill", async (skillName: string) => {
  try {
    const response = await axiosClient.delete<DriverSkill[]>(
      PREFIX_URL + "skills/" + skillName
    );

    if (response.data != undefined) {
      return response.data;
    } else {
      throw new Error("Une erreur réseau s'est produite");
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});

export const addOrUpdateDriverSkill = createAsyncThunk<
  DriverSkill[],
  DriverSkill
>("driver/addOrUpdateDriverSkill", async (data: DriverSkill) => {
  try {
    const response = await axiosClient.post<DriverSkill[]>(
      PREFIX_URL + "skills",
      data
    );

    if (response.data != undefined) {
      return response.data;
    } else {
      throw new Error("Une erreur réseau s'est produite");
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});

export const removeDriverExperience = createAsyncThunk<
  DriverExperience[],
  string
>("driver/removeDriverExperience", async (label: string) => {
  try {
    const response = await axiosClient.delete<void>(
      PREFIX_URL + "experiences/" + label
    );

    if (response.data != undefined) {
      return response.data;
    } else {
      throw new Error("Une erreur réseau s'est produite");
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});

export const addOrUpdateDriverExperience = createAsyncThunk<
  DriverExperience[],
  DriverExperience
>("driver/addOrUpdateDriverExperience", async (data: DriverExperience) => {
  try {
    const response = await axiosClient.post<DriverExperience[]>(
      PREFIX_URL + "experiences",
      data
    );

    if (response.data != undefined) {
      return response.data;
    } else {
      throw new Error("Une erreur réseau s'est produite");
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});

export const removeDriverLicence = async (licenceId: string) => {
  return new Promise<void>(async (resolve, reject) => {
    const response = await axiosClient.delete<void>(
      PREFIX_URL + "licences/" + licenceId
    );

    if (response.status < 400) {
      return resolve();
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const addOrUpdateDriverLicence = async (data: HumanIdentity) => {
  return new Promise<HumanIdentity>(async (resolve, reject) => {
    const response = await axiosClient.post<HumanIdentity>(
      PREFIX_URL + "licences",
      data
    );

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const changeDriverAvailability = createAsyncThunk<
  DriverAvaibility,
  DriverAvaibility
>("driver/updateAvailability", async (data) => {
  try {
    const response = await axiosClient.put<DriverAvaibility>(
      PREFIX_URL + "availability",
      data
    );

    if (response.data != undefined) {
      return response.data;
    } else {
      throw new Error("Une erreur réseau s'est produite");
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});
