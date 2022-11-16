#include <chrono>
#include <thread>
#include <napi.h>
#include <tchar.h>
#include <windows.h>
#include <iostream>
#include <string>
#include <system_error>
#include "TR3800DLL.h"

using namespace Napi;

std::thread nativeThread;
ThreadSafeFunction tsfn;

Value Start(const CallbackInfo &info)
{
  Napi::Env env = info.Env();

  char a[100] = "192.168.0.110";
  char b[100] = "3800";
  char *c;

  HINSTANCE hGetProcIDDLL = LoadLibrary(_T("TR3800TCPIP.dll"));
  if (!hGetProcIDDLL)
  {
    std::cout << "could not load the dynamic library" << std::endl;
    DWORD error = ::GetLastError();
    std::string message = std::system_category().message(error);
    std::cout << message << std::endl;
    throw TypeError::New(env, "could not load the dynamic library");
  }

  OpenTCPIP = (OPENTCPIP)GetProcAddress(hGetProcIDDLL, "OPENTCPIP");
  if (!OpenTCPIP)
  {
    std::cout << "could not locate the function" << std::endl;
    throw TypeError::New(env, "could not locate the function");
  }

  c = OpenTCPIP(a, b);

  throw TypeError::New(env, c);

  if (info.Length() < 2)
  {
    throw TypeError::New(env, "Expected two arguments");
  }
  else if (!info[0].IsFunction())
  {
    throw TypeError::New(env, "Expected first arg to be function");
  }
  else if (!info[1].IsNumber())
  {
    throw TypeError::New(env, "Expected second arg to be number");
  }

  int count = info[1].As<Number>().Int32Value();

  // Create a ThreadSafeFunction
  tsfn = ThreadSafeFunction::New(
      env,
      info[0].As<Function>(), // JavaScript function called asynchronously
      "Resource Name",        // Name
      0,                      // Unlimited queue
      1,                      // Only one thread will use this initially
      [](Napi::Env) {         // Finalizer used to clean threads up
        nativeThread.join();
      });

  // Create a native thread
  nativeThread = std::thread([count]
                             {
    auto callback = []( Napi::Env env, Function jsCallback, int* value ) {
      // Transform native data into JS data, passing it to the provided
      // `jsCallback` -- the TSFN's JavaScript function.
      jsCallback.Call( {Number::New( env, *value )} );

      // We're finished with the data.
      delete value;
    };

    for ( int i = 0; i < count; i++ )
    {
      // Create new data
      int* value = new int( clock() );

      // Perform a blocking call
      napi_status status = tsfn.BlockingCall( value, callback );
      if ( status != napi_ok )
      {
        // Handle error
        break;
      }

      std::this_thread::sleep_for( std::chrono::seconds( 3 ) );
    }

    // Release the thread-safe function
    tsfn.Release(); });

  return Boolean::New(env, true);
}

void initMachineConnFunctions()
{
  HINSTANCE lib = LoadLibrary(_T("TR3800TCPIP.dll"));
  OpenTCPIP = (OPENTCPIP)GetProcAddress(lib, "OPENTCPIP");
  CloseTCPIP = (CLOSETCPIP)GetProcAddress(lib, "CLOSETCPIP");
  SetTimeOut = (SETTIMEOUT)GetProcAddress(lib, "SETTIMEOUT");
  SetTime = (SETTIME)GetProcAddress(lib, "SETTIME");
  GetTime = (GETTIME)GetProcAddress(lib, "GETTIME");
  GetRecStart = (GETRECSTART)GetProcAddress(lib, "GETRECSTART");
  GetRecNext = (GETRECNEXT)GetProcAddress(lib, "GETRECNEXT");
  ClrRec = (CLRREC)GetProcAddress(lib, "CLRREC");
  GetShtM1 = (GETSHTM1)GetProcAddress(lib, "GETSHTM1");
  SetShtM1 = (SETSHTM1)GetProcAddress(lib, "SETSHTM1");
  GetAlarm = (GETALARM)GetProcAddress(lib, "GETALARM");
  SetAlarm = (SETALARM)GetProcAddress(lib, "SETALARM");
  //
  TrgSEC = (TRGSEC)GetProcAddress(lib, "TRGSEC");
  FreeMem = (FREEMEM)GetProcAddress(lib, "FREEMEM");
  AlarmOFF = (ALARMOFF)GetProcAddress(lib, "ALARMOFF");
  SetupCard = (SETUPCARD)GetProcAddress(lib, "SETUPCARD");
  SysRst = (SYSRST)GetProcAddress(lib, "SYSRST");
  AlarmDur = (ALARMDUR)GetProcAddress(lib, "ALARMDUR");
  AccessDur = (ACCESSDUR)GetProcAddress(lib, "ACCESSDUR");
  TrgAlarm = (TRGALARM)GetProcAddress(lib, "TRGALARM");
  Bios = (BIOS)GetProcAddress(lib, "BIOS");
  PerRst = (PERRST)GetProcAddress(lib, "PERRST");
  SetMemDis = (SETMEMDIS)GetProcAddress(lib, "SETMEMDIS");
  GetMemDis = (GETMEMDIS)GetProcAddress(lib, "GETMEMDIS");
  ShowMessage = (SHOWMESSAGE)GetProcAddress(lib, "SHOWMESSAGE");
  RealRec1 = (REALREC1)GetProcAddress(lib, "REALREC1");
  RealRec2 = (REALREC2)GetProcAddress(lib, "REALREC2");
  //
  CurrentTime = (CURRENTTIME)GetProcAddress(lib, "CURRENTTIME");
  FactoryRst = (FACTORYRST)GetProcAddress(lib, "FACTORYRST");
}

String openTCPIP(const CallbackInfo &info)
{
  Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString())
  {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
  }

  const char *ip = info[0].ToString().Utf8Value().c_str();
  const char *port = info[1].ToString().Utf8Value().c_str();
  std::string res = OpenTCPIP(ip, port);

  return String::New(env, res);
}

String closeTCPIP(const CallbackInfo &info)
{
  Env env = info.Env();

  std::string res = CloseTCPIP();

  return String::New(env, res);
}

String bios(const CallbackInfo &info)
{
  Env env = info.Env();
  if (info.Length() < 1 || !info[0].IsString())
  {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
  }

  const char *id = info[0].ToString().Utf8Value().c_str();

  std::string res = Bios(id);

  return String::New(env, res);
}

String getFreeMem(const CallbackInfo &info)
{
  Env env = info.Env();
  if (info.Length() < 1 || !info[0].IsString())
  {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
  }

  const char *id = info[0].ToString().Utf8Value().c_str();

  std::string res = FreeMem(id);

  return String::New(env, res);
}

String getRecStart(const CallbackInfo &info)
{
  Env env = info.Env();
  if (info.Length() < 1 || !info[0].IsString())
  {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
  }

  const char *id = info[0].ToString().Utf8Value().c_str();

  std::string res = GetRecStart(id);

  return String::New(env, res);
}

String getRecNext(const CallbackInfo &info)
{
  Env env = info.Env();
  if (info.Length() < 1 || !info[0].IsString())
  {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
  }

  const char *id = info[0].ToString().Utf8Value().c_str();

  std::string res = GetRecNext(id);

  return String::New(env, res);
}

String clrRec(const CallbackInfo &info)
{
  Env env = info.Env();
  if (info.Length() < 1 || !info[0].IsString())
  {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
  }

  const char *id = info[0].ToString().Utf8Value().c_str();

  std::string res = ClrRec(id);

  return String::New(env, res);
}

String getRecReal(const CallbackInfo &info)
{
  Env env = info.Env();
  if (info.Length() < 1 || !info[0].IsString())
  {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
  }

  const char *id = info[0].ToString().Utf8Value().c_str();

  std::string res = RealRec1(id);

  return String::New(env, res);
}

String setupCard(const CallbackInfo &info)
{
  Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString())
  {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
  }

  const char *id = info[0].ToString().Utf8Value().c_str();
  const char *cardId = info[1].ToString().Utf8Value().c_str();
  std::string res = SetupCard(id, cardId);

  return String::New(env, res);
}

Napi::Object Init(Napi::Env env, Object exports)
{
  initMachineConnFunctions();
  exports.Set("start", Function::New(env, Start));
  exports.Set(String::New(env, "openTCPIP"), Function::New(env, openTCPIP));
  exports.Set(String::New(env, "closeTCPIP"), Function::New(env, closeTCPIP));
  exports.Set(String::New(env, "bios"), Function::New(env, bios));
  exports.Set(String::New(env, "getFreeMem"), Function::New(env, getFreeMem));
  exports.Set(String::New(env, "getRecStart"), Function::New(env, getRecStart));
  exports.Set(String::New(env, "getRecNext"), Function::New(env, getRecNext));
  exports.Set(String::New(env, "getRecReal"), Function::New(env, getRecReal));
  exports.Set(String::New(env, "clrRec"), Function::New(env, clrRec));
  exports.Set(String::New(env, "setupCard"), Function::New(env, setupCard));
  return exports;
}

NODE_API_MODULE(clock, Init)