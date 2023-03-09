import { useEffect, useState } from "react";
import styled from "styled-components";
import LensApi from "../apis/lensApi";
import MenuLensCateItem from "../components/MenuLensCateItem";
import { IDays } from "../types/lens";

const MenuLensCategoryStyle = styled.div`
  width: 100%;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 60px 32px 0;

  .lens-by-period {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    margin-top: 14px;
  }
  li {
    width: 30%;
    height: 70%;
    border: 2px solid #e1e1e1;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    cursor: pointer;
  }

  li.oneday {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABSBAMAAAAiIA5hAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMA8BAwYIDg0EDAlqlwIFD1t5X3AAACuElEQVRIx+1WPWzTQBQ+HDcYN8lAVAkkSloJFQkG0oUiloYFURYDUpFAVEHAgBCSETCwIHfiZ6FVd2TExBaEmHEnVrKxMHRhLpacpEkKH04c2+/kO8dLt7whvtd+9+7du+/9MDaRgxHtltm+kRF7sQKgM5cJuwJ0V2/icxbsZeCb/zH3MmBfIXDXbo/HvkW7NlxYqI3DnoEbYBRgcwy2UHFHISvA/puOLdr4OFrmO8v76eA6XoRLw8t3UrFLaIVLpXJ3GukOd5vhWsdOAVU5VnGwHSnLfaZhPe01nsUbzVmWwzUpdgq9mDr64BA5WHHcnVgz+iwNvISXsZLDvTRwqdIn2rxbHezYlj4HpY3lDdJFFo2zKBNNxwf/V5XEWbG4JGp0g/CIDZ/nckjF08HniJgbuUqPqkZwzLmeEGxwtythdvjd/SfCqjhJ1UU3uJjzR2jYrXIRL49IKqoFBUIgslUVhrnBhU0NI54XlQI9CFTCp4397IaZfXSs4XpoWBXRyOAM67jP5C6rnGHFjrbWvSR4l4vxaWxF9H8iYAWlZs6MMuCwgJ/znOFLcSL9aCW9sDzudh5L8UKnOanY7eiYBTfphdHnMmArWtvJWORo3FSSAVPDJOSFHuYXmRp5KQEtPHGlKyHJC42kKVfpFgXXW3Cj/xctUun4l0o+fx3vZWkWdoKod71Gi6ZZWVSQ16PmF/cH/9oCw+xQN4yw6RKi/+SzIWTnqIhoJr5wtVc0OzSCIqLZeEj/Kq7K9uYI+4BrAMeYFHzKwswcvXRXPMA4e6x4FRxWs1xJa9jAcX8UekywRYe+DSfTPrT9ic4EDcxI26SDEzT8moOWfOIqhBPOUH6Z6DfTZ6e1kCgr/FUFch14dMVHvrttAs/HjETKd4TSWcswSdoB9Gsz0zB54ffqnTeTWX0iBy//AYflKelXyBseAAAAAElFTkSuQmCC")
      no-repeat 50% 25%;
  }

  li.weekly-1month {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABECAMAAAAcGiN0AAAANlBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAR2LVAAAAEXRSTlMAbxCg+vDPgMBAHy9h4LBRkNwxq9UAAALeSURBVFjD7VjZktwgDOQSl42x/v9nFyPwwIzPdZLKVtIPU2sJ2hi1hFjGOkSLehbHlvHDsg2JC4K4Z9mGQ5ycAZS3LLsLm5bPQLxl2YFFk34F4nDHckjGEN0dyzu8y9B1IHfuouVjfWlARRnY4MwCpuMab0zdsmjR6UFH8d09G2bE+UU2oX4UAIP4Whri2A/0iP6OpQ1s8/ecF2kQ2B1Lie872ZC2z0hsnFcsdpusBNZ+hPrQskeWgmOnsRPOuWWX7Dv4J8m0fQToyB6jJZPmEcJ/afyFZGLOsiltRMwPE/m8zE9GlGajce2Q2aKaXF1i1ZCn+keQ7QEE/oCMBCfp4DcYGg1VF9ChYck1HpI5OqyIzH4cH8VVbCvHDyODsrFheeA1ALF16XJQEtwBWaQpkKeLEsCp7SBgaF3yWLS5r+k6I7/vEn8wnXguT7wcaFSsfHVNi+jHy2SylfnQybwmh7pMRoeBrtIAqu+8uELCdlf8SGe/lcyA/3VkLT4yADqZjzQmX2940vNobACVYqGWHwjWxC2ymkF5yz203e9MdwijM0WOKyiAPCaZwMYPnQ1tZy+o7S86HwbmtaIFgbaGE4zVgGSe7mSAVGlGkHHDNVpI71CxX1lOgLqycXmKYuVSat5/lZfEtpLN7Zb3e8ZY/Y5diKBgIwNClwGUjqNSpxuxDLmiM+aVssdUPlwmY8v2y/2r9GBVFuhFMpVVsVWEBE/RRJWL+sme8XoNgUZnsuhsSjqjVFCyj6Zs+8C1npVPcyqd7bxMXexQEqBmAM8heuksK8uUJ09ldy0IQCtmkefVFB7QEwlTkHYuZoA7FC1LeyD6K+LxuUEJs5dsany7vB4jCcnsv0jWa7UdrpClhFF6S2oOXpKeL3T6RJLY1OTf9aqTyF7/zInhnI0o+FJqgvHNdXHRK3QhHNwJ1ulTSYWs76w6pfj3uwEe1tq90Or4rLlgLglXQ9CWD+xn4AvjoFfGjcD1qwAAAABJRU5ErkJggg==")
      no-repeat 50% 25%;
  }

  li.long-term {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABECAMAAAARBFMzAAAAOVBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADLcPMfAAAAEnRSTlMAEEDgwPsfgNGl8E9gJj5wMJDo5PtUAAACbUlEQVRYw+2Y0bKjIAyGi9BAkAXJ+z/sBq1TK8EKuzc7e3LTqcgnYPIn8fH4bioZTbt5k+AxatbTyVANgZTjqfNh7pyJ3DJGquaBIz+wrkxOmIXkukkTeemQlabQi0Ky4vW5f1meoHOgvT/XXO7cizItZ2vs/HgI9mhI2spmyHz8r9doaNQ0nJetB1dlCM+LioNnpch/3uDo1+ixP+lfRPGxNyTAnB/yBTUVmRNJiUdSD8ryBNPY3/khX1DAUhwaEUU0dZ0VpJbyQoC+Y++wH9QP6v9B0QmV8PG3UH9gTxG1xPjKXdtPjEs3SkWLjaTqDdqo7qHUnN0+z5ljvjTmPZBn9Q0VcLsV7SxvZpktbkQMVyirr594WrlOLdSiy+jdygtSuX0RUYFH+grLoIXswSjOHbbbiew536wopDTgkKlKtYwiPeTc2guokcbgoTzVKE8jIYzVZhjFgWJ6uzJucqpaglGZuDDAHhhwZPjqtTMqUM7F12/6KKTi77nuABgFvGtYI1BjuMZBwLVb5T1oUoK3u+Jt3NNusV+0pJKnImC7+pigSk2EcuC8Lk/2qFVmt+M1O+0vUAqc4iLwoSVveaK3gH2oDwh+vSqDFYpEmN4GQk1rG3rV23IGKdg2FHe1PR364itZOKio3CE3wk+LqrRrO3fod1nKyUG7o3jcx7u7c+oy4zDrme9IniejvuVBvPGpBQw1JemYnfmB/lJuVkWYbyV6VYIaW/fOeP2J6FTJrLdrrFIrp1JP16pWf5GANVGXhB9i5HcKMaatltAZXqLeMCFipiyEc57f+UE014g9FWw220e5UgyFe+77G+uHNJriW48NAAAAAElFTkSuQmCC")
      no-repeat 50% 25%;
  }

  a {
    width: 100%;
    height: auto;
    padding: 30px 0;
    text-align: center;
    font-size: 18px;
    line-height: 1.54;
    font-weight: bold;
    padding-bottom: 8%;
  }
`;

export default function MenuLensCateContainer() {
  const [days, setDays] = useState<IDays[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const dayList = await lensApi.getLensDayList();
      setDays(dayList);
    })();
  }, []);

  return (
    <MenuLensCategoryStyle>
      <h3>렌즈구분</h3>
      <ul className="lens-by-period">
        {days.map((day) => (
          <MenuLensCateItem key={day.id} day={day} />
        ))}
      </ul>
    </MenuLensCategoryStyle>
  );
}
